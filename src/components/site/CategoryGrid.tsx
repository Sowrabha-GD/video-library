import { Link } from "react-router-dom";
import {
  Settings, Code2, Zap, Layers, DollarSign, BarChart2, Brain, Award
} from "lucide-react";
import type { Category } from "../../types/course";

const iconMap: Record<string, React.ReactNode> = {
  Settings: <Settings size={22} />,
  Code2: <Code2 size={22} />,
  Zap: <Zap size={22} />,
  Layers: <Layers size={22} />,
  DollarSign: <DollarSign size={22} />,
  BarChart2: <BarChart2 size={22} />,
  Brain: <Brain size={22} />,
  Award: <Award size={22} />,
};

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to={`/library?category=${encodeURIComponent(cat.name)}`}
          className="group relative p-5 rounded-2xl bg-[#0D1525] hover:bg-[#111C30] border border-white/[0.07] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
          style={{ "--cat-color": cat.color } as React.CSSProperties}
        >
          {/* Subtle glow in corner */}
          <div
            className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-2xl"
            style={{ backgroundColor: cat.color }}
          />

          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
            style={{ backgroundColor: cat.color + "22", color: cat.color }}
          >
            {iconMap[cat.icon] ?? <Award size={22} />}
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">{cat.name}</h3>
          <p className="text-white/35 text-xs">{cat.courseCount} courses</p>
        </Link>
      ))}
    </div>
  );
}
