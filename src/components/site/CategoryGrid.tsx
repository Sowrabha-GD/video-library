import { Link } from "react-router-dom";
import {
  Settings, Code2, Zap, Layers, DollarSign, BarChart2, Brain, Award
} from "lucide-react";

export interface CategorySummary {
  name: string;
  count: number;
}

interface CategoryGridProps {
  categories: CategorySummary[];
}

const ICONS = [
  <Settings size={22} />,
  <Code2 size={22} />,
  <Zap size={22} />,
  <Layers size={22} />,
  <DollarSign size={22} />,
  <BarChart2 size={22} />,
  <Brain size={22} />,
  <Award size={22} />,
];

const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#06B6D4", "#EC4899", "#F97316", "#6366F1"];

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((cat, index) => {
        const icon = ICONS[index % ICONS.length];
        const color = COLORS[index % COLORS.length];

        return (
          <Link
            key={cat.name}
            to={`/library?category=${encodeURIComponent(cat.name)}`}
            className="group relative p-5 rounded-2xl bg-[#0D1525] hover:bg-[#111C30] border border-white/[0.07] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
          >
            {/* Subtle glow in corner */}
            <div
              className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-2xl"
              style={{ backgroundColor: color }}
            />

            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
              style={{ backgroundColor: color + "22", color }}
            >
              {icon}
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">{cat.name}</h3>
            <p className="text-white/35 text-xs">{cat.count} courses</p>
          </Link>
        );
      })}
    </div>
  );
}
