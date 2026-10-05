type BrandLogoProps = {
  onDark?: boolean;
};

export function BrandLogo({ onDark = false }: BrandLogoProps) {
  return (
    <span className={`brand-lockup${onDark ? ' brand-lockup--on-dark' : ''}`} aria-hidden="true">
      <svg className="brand-lockup__mark" viewBox="0 0 48 48" fill="none" role="presentation">
        <path
          fill="var(--accent)"
          fillRule="evenodd"
          d="M24 1.5C30.1 7 38.1 14 41.5 24 38.1 34 30.1 41 24 46.5 17.9 41 9.9 34 6.5 24 9.9 14 17.9 7 24 1.5Zm0 7.4C19.1 13.1 14.3 17.5 12.2 24 14.3 30.5 19.1 34.9 24 39.1 28.9 34.9 33.7 30.5 35.8 24 33.7 17.5 28.9 13.1 24 8.9Z"
        />
        <path
          fill="var(--accent)"
          d="M24 14.2c-2.7 3.2-4.2 6.1-4.2 10.1 0 4 1.5 6.9 4.2 9.5 2.7-2.6 4.2-5.5 4.2-9.5 0-4-1.5-6.9-4.2-10.1Z"
        />
      </svg>
      <span className="brand-lockup__copy">
        <strong>JUBBIR</strong>
        <small>PRINTERS</small>
      </span>
    </span>
  );
}
