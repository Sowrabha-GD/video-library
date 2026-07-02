import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../site/Navbar";
import { Footer } from "../site/Footer";

export function RootLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-[#050B18] text-white">
      <Navbar transparent={isHome} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
