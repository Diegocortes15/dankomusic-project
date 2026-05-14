import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "chamfer";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type AsAnchor = CommonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href" | "children">;

type AsButton = CommonProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type Props = AsAnchor | AsButton;

/**
 * Branded button. Renders an <a> when `href` is set, otherwise a <button>.
 * Variants: primary (red), ghost (outline), chamfer (clipped corner).
 */
export function Button(props: Props) {
  const { variant = "primary", className = "", children } = props;
  const cls = `btn btn--${variant} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, ...rest } = props as AsAnchor;
    return (
      <a className={cls} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  const { type, ...rest } = props as AsButton;
  return (
    <button
      className={cls}
      type={type ?? "button"}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
