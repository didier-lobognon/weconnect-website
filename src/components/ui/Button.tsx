import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Icon } from "@/components/ui/Icon";

type Variant = "primary" | "ghost" | "blue" | "outline";

/** Pill link with a sliding arrow; magnetic on desktop. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  magnetic = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  magnetic?: boolean;
}) {
  const external = /^(tel:|mailto:|https?:)/.test(href);
  const className = `btn btn-${variant}`;
  const content = (
    <>
      <span className="btn-label">{children}</span>
      {arrow ? (
        <span className="btn-arrow" aria-hidden="true">
          <Icon name="arrow" className="btn-arrow-icon" strokeWidth={2.2} />
          <Icon name="arrow" className="btn-arrow-icon" strokeWidth={2.2} />
        </span>
      ) : null}
    </>
  );

  const link = external ? (
    <a className={className} href={href}>
      {content}
    </a>
  ) : (
    <Link className={className} href={href}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic strength={0.25}>{link}</Magnetic> : link;
}
