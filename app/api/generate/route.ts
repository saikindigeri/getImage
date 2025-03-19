import { NextResponse } from "next/server";

import pool from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});




export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { command } = await request.json();
  if (!command)
    return NextResponse.json({ error: "Command required" }, { status: 400 });

  try {
    const image = await openai.images.generate({
        prompt: command,
        n: 1,
        size: "1024x1024",
        model: "dall-e-3", // DALL·E 3 explicit ga use chesthunnam
      });
  
      const imageUrl = image.data[0].url;
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
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}
