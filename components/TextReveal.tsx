"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
};

export default function TextReveal({ text, className }: Props) {
  const words =
    text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*(?:[.,!?;]+)?/gu) || [];

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
      animate="visible"
      style={{ display: "inline-block" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          transition={{ duration: 0.6 }}
          style={{ marginRight: "12px", display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
