"use client";

import { useState, useEffect } from "react";
import { Calligraph } from "calligraph";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
    <main className="flex min-h-screen flex-col items-center justify-center gap-14 bg-black">
      <Calligraph animation="smooth" autoSize={false} className="text-4xl font-bold text-white">
        {phrases[index]}
      </Calligraph>
      <div className="flex gap-6">
        <a href="https://www.instagram.com/alexdimitracopoulos" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity duration-200">
          <FaInstagram size={32} />
        </a>
        <a href="https://x.com/newtshirts_" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity duration-200">
          <FaXTwitter size={32} />
        </a>
        <a href="https://www.linkedin.com/in/alex-dimitracopoulos/" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity duration-200">
          <FaLinkedin size={32} />
        </a>
      </div>
    </main>
  );
}
