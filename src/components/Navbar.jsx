import { NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

function LinkItem({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition ${
          isActive ? "bg-violet-600 text-white" : "text-slate-200 hover:bg-slate-800"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const { favoritesCount } = useFavorites();

  return (
    <header className="border-b border-slate-800">
      <nav
        className="w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <NavLink to="/" className="flex items-center gap-2 text-slate-100">
          {/* SVG inline (requisito) */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            role="img"
            aria-label="Portal logo"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C7 2 3 6 3 12s4 10 9 10 9-4 9-10S17 2 12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.8"
            />
            <path
              d="M8 12c0-3 2-5 4-5s4 2 4 5-2 5-4 5-4-2-4-5Z"
              fill="currentColor"
              opacity="0.25"
            />
          </svg>
          <span className="font-semibold">Rick & Morty</span>
        </NavLink>

        <div className="flex items-center gap-1">
          <LinkItem to="/" end>
            Home
          </LinkItem>
          <LinkItem to="/explore">Explore</LinkItem>

          <LinkItem to="/favorites">
            Favorites
            <span className="ml-2 inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full text-xs bg-slate-800 text-slate-100">
              {favoritesCount}
            </span>
          </LinkItem>

          <LinkItem to="/contact">Contact</LinkItem>
        </div>
      </nav>
    </header>
  );
}