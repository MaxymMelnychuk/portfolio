"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  className?: string;
};

export default function TextReveal({ text, className }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const words =
    text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*(?:[.,!?;]+)?\s*/gu) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={ready ? "visible" : "hidden"}
      suppressHydrationWarning
      style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          transition={{ duration: 0.7 }}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
