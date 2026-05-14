import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Eyebrow({ children, className = "", style }: Props) {
  return (
    <div className={`eyebrow ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
