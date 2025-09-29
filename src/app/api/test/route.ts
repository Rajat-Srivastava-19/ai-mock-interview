import dbConnect from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();
  return new Response(JSON.stringify({ message: "DB Connected Successfully!!" }), { status: 200 });
}
