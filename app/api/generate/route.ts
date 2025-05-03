// pages/api/generate.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import pool from '@/lib/db'; // PostgreSQL connection
import { auth } from '@clerk/nextjs/server';


// Initialize Nebius AI client
const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: process.env.NEBIUS_API_KEY,
  timeout: 10000, // Reduced to 10s to align with Vercel Hobby plan
});

export async function POST(req: Request) {
  const { userId } = await auth(); // Synchronous
  if (!userId) {
    return NextResponse.json({ error: 'Sign in to generate image' }, { status: 401 });
  }

  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Enter a prompt to generate image' }, { status: 400 });
    }

    // Generate image using Nebius AI
    const response = await client.images.generate({
      model: 'black-forest-labs/flux-dev',
      response_format: 'b64_json',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      extra_body: {
        response_extension: 'webp',
        width: 1024,
        height: 1024,
        num_inference_steps: 28,
        negative_prompt: '',
        seed: -1,
      },
      prompt,
    });

    const imageBase64 = response.data?.[0]?.b64_json;
    if (!imageBase64) {
      throw new Error('Image generation failed: No base64 data received');
    }

    const imageUrl = `data:image/webp;base64,${imageBase64}`;

    // Insert into database
    const query = `
      INSERT INTO images (url, command, user_id)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const values = [imageUrl, prompt, userId];
    const result = await pool.query(query, values);

    console.log(`Image stored in DB with ID: ${result.rows[0].id}`);

    return NextResponse.json({ imageUrl }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error generating image:', {
      message: error.message,
      response: await error.response?.text?.() || 'No response body',
      status: error.response?.status,
    });

    // Handle specific Nebius API errors
    if (error.code === 'ECONNABORTED') {
      return NextResponse.json({ error: 'Image generation timed out' }, { status: 504 });
    }
    if (error.response?.status === 401) {
      return NextResponse.json({ error: 'Invalid Nebius API key' }, { status: 401 });
    }
    if (error.response?.status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}

// Vercel configuration for longer timeout (if on Pro plan)
export const config = {
  maxDuration: 30, // Increase to 30s for image generation
};