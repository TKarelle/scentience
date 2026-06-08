import logoPaper from "../../image/logopaper-transparent.png";
import logoWine from "../../image/logowine-transparent.png";
import logoBlack from "../../image/logoblack-transparent.png";

const SRC = {
  paper: logoPaper,
  wine: logoWine,
  black: logoBlack,
};

/**
 * Grand logo centreé en filigrane (opacité très faible), façon référence « The ingredients ».
 */
export default function SectionLogoWatermark({
  variant = "paper",
  className = "",
  imgClassName,
}) {
  const src = SRC[variant];
  if (!src) return null;

  const defaultImg =
    variant === "wine"
      ? "h-auto w-[min(92vw,44rem)] max-h-[min(80vh,32rem)] object-contain opacity-[0.09] sm:opacity-[0.08]"
      : variant === "black"
        ? "h-auto w-[min(92vw,40rem)] max-h-[min(70vh,28rem)] object-contain opacity-[0.14] sm:opacity-[0.12]"
        : "h-auto w-[min(92vw,44rem)] max-h-[min(80vh,36rem)] object-contain opacity-[0.07] sm:opacity-[0.06]";

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden
    >
      <img
        src={src}
        alt=""
        className={imgClassName ?? defaultImg}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
