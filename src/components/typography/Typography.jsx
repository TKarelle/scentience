/**
 * Marque & sous-titres (voir `index.css` : `.typo-title`, `.typo-subtitle`, etc.).
 * Patrons récurrents landing : `.landing-section-title`, `.typo-body-lead`, `.typo-typewriter-lead`, …
 */

export const typewriterFaceClass = "typewriter-face";

const cx = (...parts) => parts.filter(Boolean).join(" ");

export function BrandMark({
  as: Tag = "span",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={cx(typewriterFaceClass, "uppercase text-wine", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Sous-titre TLWG (ex. ligne sous le logo) */
export function Subtitle({
  as: Tag = "p",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag className={cx("typo-subtitle", className)} {...props}>
      {children}
    </Tag>
  );
}
