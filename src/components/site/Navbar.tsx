import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search, Bell, User, Menu, X, BookOpen, LayoutDashboard,
  Library, ChevronDown, Zap, GraduationCap
} from "lucide-react";

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/library?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { to: "/library", label: "Library", icon: <Library size={16} /> },
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
    { to: "/profile", label: "Profile", icon: <User size={16} /> },
  ];

  const isScrolledOrSolid = scrolled || !transparent;

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolledOrSolid
            ? "bg-[#050B18]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40"
            : "bg-transparent border-b border-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
                <GraduationCap size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                <span className="text-white">Wizdin</span>
                <span className="text-blue-400 ml-1">Video</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "bg-blue-500/15 text-blue-400"
                      : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              <div className="hidden md:block">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <div className="flex items-center bg-white/[0.06] border border-white/[0.1] rounded-xl overflow-hidden">
                      <input
                        autoFocus
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search courses..."
                        className="bg-transparent px-4 py-2 text-sm text-white placeholder-white/40 outline-none w-56"
                      />
                      <button type="submit" className="px-3 py-2 text-white/60 hover:text-white">
                        <Search size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSearchOpen(false)}
                        className="px-3 py-2 text-white/40 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
                  >
                    <Search size={18} />
                  </button>
                )}
              </div>

              <button className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500" />
              </button>

              <Link
                to="/profile"
                className="hidden md:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-blue-500/50">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-white/80 font-medium">Alex</span>
                <ChevronDown size={14} className="text-white/40" />
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#050B18]/98 backdrop-blur-xl border-t border-white/[0.06]">
            <div className="px-4 py-4 space-y-1">
              <form onSubmit={handleSearch} className="flex items-center bg-white/[0.06] border border-white/[0.1] rounded-xl mb-3 overflow-hidden">
                <Search size={16} className="ml-3 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none"
                />
              </form>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive
                      ? "bg-blue-500/15 text-blue-400"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
