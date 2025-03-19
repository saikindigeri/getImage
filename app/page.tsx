"use client";

import { useState } from "react";
import { useUser, SignInButton, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();
  const [command, setCommand] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ command }),
    });
    const data = await res.json();
    console.log(data);
    if (data.imageUrl) setImageUrl(data.imageUrl);
  }; 

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <SignedIn>

        <SignOutButton/>
        <h1>Hey, {user?.firstName}! Generate an Image</h1>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter a command (e.g., 'dog')"
          style={{ padding: "5px", margin: "10px" }}
        />
        <button onClick={handleGenerate} style={{ padding: "5px 10px" }}>
          Generate
        </button>
        {imageUrl && (
          <div>
            <Image width={100} height={100} src={imageUrl} alt="Generated" style={{ marginTop: "20px" }} />
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <p>Sign in to generate images!</p>
        <SignInButton />
      </SignedOut>
    </div>
  );
}