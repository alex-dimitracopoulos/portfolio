"use client";

import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <TypeAnimation
        sequence={["Hello World, I'm Alex"]}
        speed={50}
        className="text-4xl font-bold text-white"
        cursor={true}
      />
    </main>
  );
}
