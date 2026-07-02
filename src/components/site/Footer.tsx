import { Link } from "react-router-dom";
import { GraduationCap, Youtube, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#030811] border-t border-white/[0.05] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <GraduationCap size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-white">Wizdin</span>
                <span className="text-blue-400 ml-1">Video</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Premium Salesforce video learning by Jeet Singh — CTA, 12x certified, and trusted by 48,000+ learners.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <Youtube size={18} />, href: "https://youtube.com/@salesforcewithJeet", label: "YouTube" },
                { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
                { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/library", label: "Course Library" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/profile", label: "My Profile" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/45 hover:text-white/80 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">Courses</h4>
            <ul className="space-y-2.5">
              {[
                "Salesforce Admin",
                "Apex Development",
                "Lightning Web Components",
                "Salesforce Flows",
                "Integration Architect",
                "CPQ & Revenue",
              ].map((l) => (
                <li key={l}>
                  <Link to="/library" className="text-white/45 hover:text-white/80 text-sm transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">Creator</h4>
            <ul className="space-y-2.5">
              {[
                { label: "jeet-singh.com", href: "https://jeet-singh.com" },
                { label: "YouTube Channel", href: "https://youtube.com/@salesforcewithJeet" },
                { label: "LinkedIn", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white/80 text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            © {new Date().getFullYear()} Wizdin Video Library. Built by Jeet Singh.
          </p>
          <p className="text-white/25 text-xs">
            All Salesforce trademarks are property of Salesforce, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
