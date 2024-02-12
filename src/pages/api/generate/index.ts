import { systemContent } from "@/util/config";
import { OpenAIStream, OpenAIStreamPayload } from "@/util/openAIstream";
import { parse } from "path";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

export default async function POST(req: Request): Promise<Response> {
  const { prompt, context, temp } = (await req.json()) as {
    prompt: string;
    context: string;
    temp: number;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: process.env.OPENAI_MODEL,
    // model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: context },
      {
        role: "user",
        content: `. The prompt is: ${prompt}. `,
      },
    ],
    temperature: temp,
    // top_p: 1.0,
    // frequency_penalty: 0.0,
    // presence_penalty: 0.0,
    // max_tokens: 9000,
    // n: 1,
    stream: true,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}


