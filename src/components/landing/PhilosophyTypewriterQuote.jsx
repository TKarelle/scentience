import { useEffect, useMemo, useRef, useState } from "react";

const CHAR_MS = 36;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function flattenParts(parts) {
  const chars = [];
  for (const part of parts) {
    for (const ch of part.text) {
      chars.push({ ch, accent: part.accent });
    }
  }
  return chars;
}

function renderTypedChars(chars, visibleCount) {
  const nodes = [];
  let buffer = "";
  let bufferAccent = false;
  let key = 0;

  function flush() {
    if (!buffer) return;
    nodes.push(
      bufferAccent ? (
        <span key={key++} className="philosophy-quote__keyword">
          {buffer}
        </span>
      ) : (
        <span key={key++}>{buffer}</span>
      )
    );
    buffer = "";
  }

  for (let i = 0; i < visibleCount; i += 1) {
    const { ch, accent } = chars[i];
    if (accent !== bufferAccent && buffer) flush();
    bufferAccent = accent;
    buffer += ch;
  }
  flush();
  return nodes;
}

/**
 * Citation philosophie — une ligne, frappe typewriter au scroll.
 */
export default function PhilosophyTypewriterQuote({ parts }) {
  const rootRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const chars = useMemo(() => flattenParts(parts), [parts]);

  const [started, setStarted] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  const fullText = parts.map((part) => part.text).join("");

  useEffect(() => {
    if (reducedMotion) {
      setStarted(true);
      setCharIndex(chars.length);
      setDone(true);
      return undefined;
    }

    const node = rootRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, chars.length]);

  useEffect(() => {
    if (!started || done || reducedMotion) return undefined;

    if (charIndex >= chars.length) {
      setDone(true);
      return undefined;
    }

    const tickId = window.setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, CHAR_MS);

    return () => window.clearTimeout(tickId);
  }, [started, done, charIndex, chars.length, reducedMotion]);

  const showCursor = started && charIndex > 0;

  return (
    <blockquote
      ref={rootRef}
      className="philosophy-quote philosophy-quote--featured"
      cite="/the-science"
    >
      <p className="philosophy-quote__line" aria-hidden={!started && !reducedMotion}>
        {renderTypedChars(chars, charIndex)}
        {showCursor && (
          <span
            className={`philosophy-quote__cursor${
              done ? " philosophy-quote__cursor--hold" : ""
            }`}
            aria-hidden
          />
        )}
      </p>
      <span className="sr-only">{fullText}</span>
    </blockquote>
  );
}
