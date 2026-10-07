"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, telHref } from "@/lib/brand";
import { NAV } from "@/lib/content";
import ReserveLink from "./ReserveLink";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <header className="head wrap">
        <Link href="/" className="mark" aria-label={`${BRAND.name}, home`}>
          <Image src="/brand/logo-compact.svg" width={664} height={150} alt="" priority />
        </Link>
        <nav className="nav label" aria-label="Main">
          {NAV.map((l) => (
            <Link key={l.href} className="ul" href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <ReserveLink className="ul label head-cta on" href="/cars" arrow={false}>
          Reserve a car
        </ReserveLink>
        <button type="button" className="menu-btn label" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="site-menu">
          Menu
        </button>
      </header>

      {open && (
        <div className="menu" id="site-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="menu-top">
            <Link href="/" className="mark" aria-label={`${BRAND.name}, home`} onClick={close}>
              <Image src="/brand/logo-compact-light.svg" width={664} height={150} alt="" />
            </Link>
            <button type="button" className="menu-btn label" style={{ display: "inline-flex", color: "var(--paper)" }} onClick={close} autoFocus>
              Close
            </button>
          </div>
          <nav className="menu-links display" aria-label="Mobile">
            <Link href="/" onClick={close} aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} onClick={close} aria-current={isActive(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
            <ReserveLink href="/cars" className="ital" arrow={false} onOpen={close}>Reserve a car</ReserveLink>
          </nav>
          <div className="menu-foot label">
            <a href={telHref}>{BRAND.phone}</a>
            <Link href="/terms-and-conditions" onClick={close}>Terms</Link>
          </div>
        </div>
      )}
    </>
  );
}
