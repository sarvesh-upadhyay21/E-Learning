"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

const normalizePath = (p?: string) => {
  if (!p) return "/";
  return p.startsWith("/") ? p : `/${p}`;
};

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname() || "/";
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // normalize target paths
  const itemHref = normalizePath(item.href);

  useEffect(() => {
    const subPaths = item.submenu?.map((s) => normalizePath(s.href)) || [];
    const isLinkActive = path === itemHref || subPaths.includes(path);
    setIsActive(Boolean(isLinkActive));
  }, [path, itemHref, item.submenu]);

  // close submenu on outside click or Escape
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setSubmenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSubmenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleMouseEnter = () => {
    if (item.submenu) setSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (item.submenu) setSubmenuOpen(false);
  };

  const toggleSubmenu = () => setSubmenuOpen((s) => !s);

  const onKeyDownToggle = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSubmenu();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main link (use normalized href) */}
      <Link
        href={itemHref}
        className={`text-lg flex items-center gap-2 hover:text-black capitalize relative ${isActive
          ? "text-black after:absolute after:w-8 after:h-1 after:bg-primary after:rounded-full after:-bottom-1"
          : "text-grey"
          }`}
        aria-current={isActive ? "page" : undefined}
      >
        <span>{item.label}</span>

        {/* If there's a submenu show toggle button (separate interactive control) */}
        {item.submenu && (
          <button
            type="button"
            aria-expanded={submenuOpen}
            aria-haspopup="menu"
            onClick={(e) => {
              e.preventDefault(); // keep link navigation from firing
              toggleSubmenu();
            }}
            onKeyDown={onKeyDownToggle}
            className="ml-2 inline-flex items-center justify-center"
          >
            <svg
              className={`${submenuOpen ? "rotate-180" : ""} transition-transform`}
              xmlns="http://www.w3.org/2000/svg"
              width="1.1em"
              height="1.1em"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m7 10l5 5l5-5"
              />
            </svg>
          </button>
        )}
      </Link>

      {/* Submenu popover */}
      {item.submenu && submenuOpen && (
        <div
          role="menu"
          className="absolute py-2 left-0 mt-0.5 w-60 bg-white dark:bg-darklight dark:text-white shadow-lg rounded-lg z-50"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {item.submenu.map((subItem, index) => {
            const subHref = normalizePath(subItem.href);
            const isSubItemActive = path === subHref;
            return (
              <Link
                key={index}
                href={subHref}
                role="menuitem"
                onClick={() => setSubmenuOpen(false)}
                className={`block px-4 py-2 ${isSubItemActive
                  ? "bg-primary text-white"
                  : "text-black dark:text-white hover:bg-primary/10"
                  }`}
              >
                {subItem.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
