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
          <img
            src="/img/logo-rm.png"
            alt="Rick & Morty logo"
            className="w-8 h-8 object-contain"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/img/no-image.png";
            }}
          />
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