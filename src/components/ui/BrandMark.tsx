/** Official We.Connect colours (from the logo file). */
export const logoColors = {
  sky: "#3D9BE9",
  orange: "#F7931E",
  green: "#3FA866",
  navy: "#0D2347",
};

/** Network "W" mark from the official logo. `tone="light"` lifts it for dark backgrounds. */
export function BrandMark({
  className = "logo-mark",
  tone = "color",
}: {
  className?: string;
  tone?: "color" | "light";
}) {
  const line = tone === "light" ? "#ffffff" : logoColors.sky;
  const top = tone === "light" ? "#7CC1FF" : logoColors.sky;

  return (
    <svg className={className} viewBox="0 0 332 256" fill="none" aria-hidden="true">
      <g stroke={line} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 28 L110 228 L166 125 L223 228 L303 28" />
        <path d="M68 125 L166 28 L264 125" />
      </g>
      <circle cx="28" cy="28" r="26" fill={logoColors.orange} />
      <circle cx="166" cy="28" r="26" fill={top} />
      <circle cx="303" cy="28" r="26" fill={logoColors.orange} />
      <circle cx="110" cy="228" r="26" fill={logoColors.orange} />
      <circle cx="223" cy="228" r="26" fill={logoColors.green} />
    </svg>
  );
}

/** Stacked wordmark from the official logo: WE. / CONNECT */
export function Wordmark({ className = "wordmark" }: { className?: string }) {
  return (
    <span className={className}>
      <span>
        WE<span className="wordmark-dot">.</span>
      </span>
      <span>CONNECT</span>
    </span>
  );
}

/** Mark + stacked wordmark (+ optional tagline), as on the official logo. */
export function Logo({
  tone = "color",
  tagline = false,
  className = "logo",
}: {
  tone?: "color" | "light";
  tagline?: boolean;
  className?: string;
}) {
  return (
    <span className={`${className} logo-${tone}`}>
      <BrandMark tone={tone} className="logo-mark" />
      <span className="logo-text">
        <Wordmark className="logo-wordmark" />
        {tagline ? <span className="logo-tagline">Connecter pour réussir</span> : null}
      </span>
    </span>
  );
}
