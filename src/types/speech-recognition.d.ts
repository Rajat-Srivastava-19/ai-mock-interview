/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/speech-recognition.d.ts

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onaudiostart?: (this: SpeechRecognition, ev: Event) => any;
  onaudioend?: (this: SpeechRecognition, ev: Event) => any;
  onend?: (this: SpeechRecognition, ev: Event) => any;
  onerror?: (this: SpeechRecognition, ev: Event) => any;
  onnomatch?: (this: SpeechRecognition, ev: Event) => any;
  onresult?: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
  onsoundstart?: (this: SpeechRecognition, ev: Event) => any;
  onsoundend?: (this: SpeechRecognition, ev: Event) => any;
  onspeechend?: (this: SpeechRecognition, ev: Event) => any;
  onspeechstart?: (this: SpeechRecognition, ev: Event) => any;
  onstart?: (this: SpeechRecognition, ev: Event) => any;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface Window {
  SpeechRecognition: new () => SpeechRecognition;
  webkitSpeechRecognition: new () => SpeechRecognition;
}
