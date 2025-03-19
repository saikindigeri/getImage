import { NextResponse } from "next/server";

import pool from "@/lib/db";
import { auth } from "@clerk/nextjs/server";




export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { command } = await request.json();
  if (!command) return NextResponse.json({ error: "Command required" }, { status: 400 });


  try {
    // Hugging Face Stable Diffusion API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: command, // Prompt
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("HF Error:", errorText);
      throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    // Response is a binary image – convert to URL
    const imageBlob = await response.blob();
    const imageUrl = URL.createObjectURL(imageBlob);
    console.log("Generated Image URL:", imageUrl);

    // Save to Supabase
    const client = await pool.connect();
    try {
      const res = await client.query(
        "INSERT INTO images (url, command, user_id) VALUES ($1, $2, $3) RETURNING *",
        [imageUrl, command, userId]
      );
      console.log("DB Response:", res.rows);
      return NextResponse.json({ imageUrl: res.rows[0].url });
    } catch (dbError) {
      console.error("DB Error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("HF Error:", error);
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
  }
}