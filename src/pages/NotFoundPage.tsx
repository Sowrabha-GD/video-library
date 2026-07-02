import { Link } from "react-router-dom";
import { GraduationCap, Home, Library } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
          <GraduationCap size={36} className="text-blue-400" />
        </div>
        <h1 className="text-7xl font-extrabold text-white/10 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page not found</h2>
        <p className="text-white/40 mb-8 text-sm leading-relaxed">
          This page doesn't exist. The course you're looking for might have moved or been updated.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/15 border border-blue-500/25 text-blue-300 text-sm font-semibold hover:bg-blue-500/25 transition-all"
          >
            <Home size={16} /> Home
          </Link>
          <Link
            to="/library"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-sm font-semibold hover:bg-white/[0.09] transition-all"
          >
            <Library size={16} /> Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
