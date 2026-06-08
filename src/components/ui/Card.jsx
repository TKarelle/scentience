/**
 * Surface vitrée réutilisable : fond semi-transparent (`card-fill-*` dans index.css).
 * Flou d’arrière-plan léger pour l’effet glass sans masquer l’image. Sans bordure.
 * Par défaut : parchemin (`paper`). `tone` pour une autre couleur token.
 */

const cx = (...parts) => parts.filter(Boolean).join(" ");

const TONE_FILL = {
  paper: "card-fill-paper",
  white: "card-fill-white",
  mist: "card-fill-mist",
  ink: "card-fill-ink",
  wine: "card-fill-wine",
};

export default function Card({
  as: Tag = "div",
  tone = "paper",
  className = "",
  children,
  ...props
}) {
  const fillClass = TONE_FILL[tone] ?? TONE_FILL.paper;

  return (
    <Tag
      className={cx(
        "shadow-sm backdrop-blur-sm",
        fillClass,
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
