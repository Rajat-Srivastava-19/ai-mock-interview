/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Sentiment from "sentiment";
import natural from "natural";

const tokenizer = new natural.WordTokenizer();
const sentiment = new Sentiment();

export async function POST(request: Request) {
  try {
    const { questions, answers } = await request.json();

    if (!answers || answers.length === 0) {
      return NextResponse.json(
        { success: false, error: "No answers provided" },
        { status: 400 }
      );
    }

    let totalConfidence = 0;
    const evaluated = await Promise.all(answers.map(async (ans: string, i: number) => {
      const question = questions[i] || "";
      const cleanAnswer = ans.trim().toLowerCase();

      const wordCount = cleanAnswer.split(" ").length;
      const lengthScore = Math.min(wordCount / 50, 1) * 20;

      const questionTokens = tokenizer.tokenize(question.toLowerCase());
      const answerTokens = tokenizer.tokenize(cleanAnswer);
      const overlap = questionTokens.filter((t) => answerTokens.includes(t));
      const keywordScore = Math.min(overlap.length / questionTokens.length, 1) * 20;

      const sentimentResult = sentiment.analyze(cleanAnswer);
      const sentimentScore = ((sentimentResult.score + 5) / 10) * 20;

      const fillerWords = ["um", "uh", "like", "you know", "actually", "basically"];
      const fillerCount = fillerWords.filter((f) => cleanAnswer.includes(f)).length;
      const avgSentenceLength = cleanAnswer.split(".").map(s => s.split(" ").length).reduce((a,b)=>a+b,0) / (cleanAnswer.split(".").length || 1);
      const clarityPenalty = fillerCount * 2;
      const clarityScore = Math.max(0, (20 - clarityPenalty - Math.abs(avgSentenceLength - 15)));

      let grammarScore = 15;
      try {
        const grammarCheck = await fetch("https://api.languagetool.org/v2/check", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            text: cleanAnswer,
            language: "en-US",
          }),
        });
        const grammarData = await grammarCheck.json();
        const issues = grammarData.matches?.length || 0;
        grammarScore = Math.max(0, 20 - issues * 2);
      } catch {
        grammarScore = 15;
      }

      const confidence = Math.round(
        lengthScore + keywordScore + sentimentScore + clarityScore + grammarScore
      );

      return {
        question,
        answer: ans,
        sentimentScore: (sentimentScore / 20).toFixed(2),
        lengthScore,
        keywordScore,
        grammarScore,
        clarityScore,
        confidence,
      };
    }));

    totalConfidence = evaluated.reduce((sum, r) => sum + r.confidence, 0);

    const overallConfidence = Math.round(totalConfidence / evaluated.length);

    let feedback = "";
    if (overallConfidence > 85) {
      feedback = "Excellent! Your responses show strong clarity, confidence, and grammar control.";
    } else if (overallConfidence > 65) {
      feedback = "Good attempt! Try to reduce filler words and use more relevant keywords.";
    } else if (overallConfidence > 45) {
      feedback = "You need more structure. Focus on explaining your ideas clearly and improving grammar.";
    } else {
      feedback = "Keep practicing. Try forming longer, more detailed answers with fewer fillers.";
    }

    return NextResponse.json({
      success: true,
      confidence: overallConfidence,
      feedback,
      results: evaluated,
    });
  } catch (error: any) {
    console.error("Error evaluating interview:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
