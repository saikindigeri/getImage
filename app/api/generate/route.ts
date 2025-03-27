import { NextResponse } from "next/server";
import OpenAI from "openai";
import pool from "@/lib/db"; // PostgreSQL connection
import { auth } from "@clerk/nextjs/server"; // Clerk authentication

// Initialize Nebius AI client
const client = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
  timeout:30000,
});

export async function POST(req: Request) {
  const { userId } = await auth(); // No need for 'await', auth() is synchronous
  if (!userId) return NextResponse.json({ error: "Sign In to generate Image" }, { status: 401 });
  

  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({error:"Enter a prompt to generate Image"},{status:401});
    // Generate image using Nebius AI
 
    const response = await client.images.generate({
      model: "black-forest-labs/flux-dev",
      response_format: "b64_json",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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

    const imageUrl = `data:image/webp;base64,${imageBase64}`;
    //console.log("Generated Image URL:", imageUrl);

    const query = `
    INSERT INTO images (url, command, user_id)
    VALUES ($1, $2, $3)
  `;

  const values=[imageUrl,prompt,userId];

  // Execute the query using the pool
  await pool.query(query, values);


  return NextResponse.json({ imageUrl }, { status: 200 });
   

   
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error:"something went wrong"}, { status: 500 });
  }
}
