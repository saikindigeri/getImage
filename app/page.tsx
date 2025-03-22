"use client";

import { SignedIn, SignedOut, SignIn, SignInButton } from "@clerk/nextjs";
import { useState } from "react";
import Header from "./components/Header";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    if (!prompt) return;
    
    setLoading(true);
    setImageSrc("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setImageSrc(data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
<>
<SignedIn>
<Header/>

<div className="flex flex-col items-center justify-center min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-4">Generate Image</h1>

      <input
        type="text"
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="px-4 py-2 border rounded-md text-black w-80"
      />

      <button
        onClick={handleGenerateImage}
        className="mt-4 px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {imageSrc && (
        <div className="mt-6">
          <img src={imageSrc} alt="Generated" className="rounded-md shadow-lg" />
        </div>
      )}
    </div>
</SignedIn>
<SignedOut>
  <SignInButton/>
</SignedOut>

</>
    
  );
}
