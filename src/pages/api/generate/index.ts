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
  const { prompt} = (await req.json()) as {
    prompt: string;
  };

  let temp=0.1;
  let context = "The two objects are list of traits and events for a given the user. These are collected from a user profile which tracks user behaviors and actions.  Provide a short paragraph describing the user based on the traits and events provided.  This is an ecommerce use case selling shoes and apparel.  Wrap up the paragraph by adding a line break and putting the user into an audience group such as Power User, Recently Returned, etc.  After that, provide me their most likely next action."

  

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo-1106",
    // model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: context },
      {
        role: "user",
        content: `. The prompt is: ${prompt}. `,
      },
    ],
    temperature: 0.2,
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


