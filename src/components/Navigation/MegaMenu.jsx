import { Link, useLocation } from 'react-router-dom';

/**
 * NavItem
 * ──────────────────────────────────────────────────────────────────
 * A single desktop navigation item linking directly to the section page.
 * ──────────────────────────────────────────────────────────────────
 */
export const NavItem = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.path);

  return (
    <li className="relative">
      <Link
        to={item.path}
        className={`
          flex items-center
          text-xs xl:text-sm font-medium tracking-wide
          py-2 px-2 xl:px-3
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
