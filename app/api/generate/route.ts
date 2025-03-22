import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NEBIUS_API_KEY, 
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const response = await client.images.generate({
      model: "black-forest-labs/flux-dev",
      response_format: "b64_json",
      extra_body: {
        response_extension: "webp",
        width: 1024,
        height: 1024,
        num_inference_steps: 28,
        negative_prompt: "",
        seed: -1,
      },
      prompt,
    });

    const imageBase64 = response.data[0]?.b64_json;
    if (!imageBase64) throw new Error("Image generation failed");

    return NextResponse.json({ imageUrl: `data:image/webp;base64,${imageBase64}` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
