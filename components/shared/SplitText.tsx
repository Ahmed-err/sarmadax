"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";

interface Props {
  text: string;
  className?: string;
  /** Apply gradient fill to every character / word span. */
  gradient?: boolean;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

const GRADIENT_STYLE: React.CSSProperties = {
  background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export function SplitText({
  text,
  className,
  gradient = false,
  delay = 0,
  stagger = 0.022,
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-40px" });
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Arabic: word-level split — preserves ligatures and correct glyph shaping.
  // Latin: character-level split — enables fine stagger.
  const segments = isRTL
    ? text.split(/(\s+)/)   // ["word", " ", "word", ...]
    : text.split("");

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={isRTL ? { direction: "rtl" } : undefined}
    >
      {segments.map((seg, i) => {
        // Whitespace tokens (both LTR and RTL): render a non-collapsing space.
        // A single " " inside an inline-block collapses to zero width, gluing
        // adjacent characters together — keep it visible without animating.
        if (seg.length > 0 && seg.trim() === "") {
          return (
            <span key={i} aria-hidden style={{ display: "inline-block" }}>
              {" "}
            </span>
          );
        }

        return (
          <motion.span
            key={i}
            aria-hidden
            // Gradient applied per-span — the only reliable method when text
            // lives in inline-block children (parent background-clip:text does
            // not clip through child compositing layers).
            style={{
              display: "inline-block",
              ...(gradient ? GRADIENT_STYLE : {}),
            }}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: delay + i * stagger,
              duration: 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {seg}
          </motion.span>
        );
      })}
    </span>
  );
}
