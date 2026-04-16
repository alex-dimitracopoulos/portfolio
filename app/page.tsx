"use client";

import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { Calligraph } from "calligraph";

const phrases = [
  "Hello World, I'm Alex",    // English
  "Hola Mundo, soy Alex",     // Spanish
  "Bonjour Monde, je suis Alex", // French
  "Ciao Mondo, sono Alex",    // Italian
  "Hallo Welt, ich bin Alex", // German
  "Привет мир, я Алекс",      // Russian
  "こんにちは世界、私はアレックスです", // Japanese
  "Γεια σου Κόσμε, είμαι ο Αλεξ", // Greek
  "Hello World, I'm Alex",    // back to English
];

export default function Home() {
  const [phase, setPhase] = useState<"typing" | "morphing">("typing");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phase !== "morphing") return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      {phase === "typing" ? (
        <TypeAnimation
          sequence={[
            "Hello World, I'm Alex",
            500,
            () => setPhase("morphing"),
          ]}
          speed={50}
          cursor={false}
          className="text-4xl font-bold text-white"
        />
      ) : (
        <Calligraph
          animation="smooth"
          className="text-4xl font-bold text-white"
        >
          {phrases[index]}
        </Calligraph>
      )}
    </main>
  );
}
