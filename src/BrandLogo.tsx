type BrandLogoProps = {
  onDark?: boolean;
};

/**
 * Official Jubbir Printers identity extracted from the approved business-card artwork.
 * Keep the supplied wordmark intact; the light variant is used on dark surfaces.
 */
export function BrandLogo({ onDark = false }: BrandLogoProps) {
  return (
    <span className={`brand-lockup${onDark ? ' brand-lockup--on-dark' : ''}`} aria-hidden="true">
      <img
        className="brand-lockup__official"
        src={onDark ? './jubbir-official-logo-on-dark.png' : './jubbir-official-logo.png'}
        alt=""
        width={68}
        height={74}
        decoding="async"
      />
    </span>
  );
}
