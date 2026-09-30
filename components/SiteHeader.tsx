"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, telHref } from "@/lib/brand";
import { NAV } from "@/lib/content";

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
        <Link href="/" className="mark display ital" aria-label={`${BRAND.name}, home`}>
          {BRAND.name}
        </Link>
        <nav className="nav label" aria-label="Main">
          {NAV.map((l) => (
            <Link key={l.href} className="ul" href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link className="ul label head-cta on" href="/cars">
          Reserve a car
        </Link>
        <button type="button" className="menu-btn label" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="site-menu">
          Menu
        </button>
      </header>

      {open && (
        <div className="menu" id="site-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="menu-top">
            <Link href="/" className="mark display ital" style={{ color: "var(--paper)" }} onClick={close}>
              {BRAND.name}
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
            <Link href="/cars" className="ital" onClick={close}>Reserve a car</Link>
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
