import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkTo?: string;
  linkLabel?: string;
}

export function SectionHeader({ title, subtitle, linkTo, linkLabel = "View all" }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-8 gap-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1.5">{title}</h2>
        {subtitle && <p className="text-white/45 text-sm sm:text-base max-w-xl">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-semibold whitespace-nowrap transition-colors group"
        >
          {linkLabel}
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
