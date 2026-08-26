"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * NavItem
 * ──────────────────────────────────────────────────────────────────
 * A single desktop navigation item linking directly to the section page.
 * ──────────────────────────────────────────────────────────────────
 */
export const NavItem = ({ item }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.path);

  return (
    <li className="relative">
      <Link
        href={item.path}
        className={`
          flex items-center
          text-[11px] lg:text-xs xl:text-sm font-medium tracking-wide
          py-1 px-1.5 xl:px-2.5
          nav-item-hover
          transition-colors duration-200
          whitespace-nowrap
          ${isActive ? 'text-skcet-gold' : 'text-white/80 hover:text-white'}
        `}
      >
        {item.label}
      </Link>
    </li>
  );
};
