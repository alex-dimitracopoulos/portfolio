"use client";

import { useState, useEffect } from "react";
import { Calligraph } from "calligraph";

const phrases = [
  "Hello World, I'm Alex",
  "Hola Mundo, soy Alex",
  "Γεια σου Κόσμε, είμαι ο Αλεξ",
  "Bonjour Monde, je suis Alex",
  "Ciao Mondo, sono Alex",
  "Hallo Welt, ich bin Alex",
  "Привет мир, я Алекс",
  "こんにちは世界、私はアレックスです",
  "Hello World, I'm Alex",
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <Calligraph animation="smooth" autoSize={false} className="text-4xl font-bold text-white">
        {phrases[index]}
      </Calligraph>
    </main>
  );
}
