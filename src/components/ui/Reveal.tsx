"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
};

/**
 * Scroll-triggered reveal. Adds `.is-revealed` once the element is ≥8% in view.
 * One-shot. Animations + reduced-motion handling live in globals.css.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-revealed");
            obs.unobserve(el);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const mergedStyle = {
    ...(style ?? {}),
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={`reveal ${className}`.trim()} style={mergedStyle} {...rest}>
      {children}
    </Component>
  );
}
