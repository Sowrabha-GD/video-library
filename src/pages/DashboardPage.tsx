import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Play, Layers, ChevronRight, Sparkles } from "lucide-react";
import coursesData from "../data/courses.json";
import type { Course } from "../types/course";

const RECENT_COUNT = 4;

export function DashboardPage() {
  const courses = coursesData as Course[];

  const totalVideos = useMemo(
    () => courses.reduce((sum, c) => sum + c.videos.length, 0),
    [courses]
  );

  const categories = useMemo(
    () => Array.from(new Set(courses.map((c) => c.category))),
    [courses]
  );

  // The JSON array is treated as ordered oldest → newest, so the tail is "recently added".
  const recentlyAdded = useMemo(
    () => [...courses].slice(-RECENT_COUNT).reverse(),
    [courses]
  );

  const stats = [
    {
      icon: <BookOpen size={20} className="text-blue-400" />,
      value: courses.length,
      label: "Total Courses",
      bg: "from-blue-500/10 to-blue-500/5",
      border: "border-blue-500/15",
    },
    {
      icon: <Play size={20} className="text-violet-400" />,
      value: totalVideos,
      label: "Total Videos",
      bg: "from-violet-500/10 to-violet-500/5",
      border: "border-violet-500/15",
    },
    {
      icon: <Layers size={20} className="text-emerald-400" />,
      value: categories.length,
      label: "Categories",
      bg: "from-emerald-500/10 to-emerald-500/5",
      border: "border-emerald-500/15",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Dashboard</h1>
          <p className="text-white/40 text-sm">An overview of everything in the course library.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`relative p-5 rounded-2xl bg-gradient-to-br ${s.bg} border ${s.border} overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
                  {s.icon}
                </div>
              </div>
              <div className="text-2xl font-extrabold text-white mb-0.5">{s.value}</div>
              <div className="text-white/40 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="bg-[#0D1525] border border-white/[0.07] rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Layers size={18} className="text-emerald-400" /> Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/library?category=${encodeURIComponent(cat)}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/[0.05] text-white/60 hover:text-white hover:bg-white/[0.09] border border-white/[0.07] transition-all"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Recently Added Courses */}
        <div className="bg-[#0D1525] border border-white/[0.07] rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-400" /> Recently Added Courses
          </h2>
          <div className="space-y-3">
            {recentlyAdded.map((course) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="flex items-center gap-4 p-3.5 bg-[#080F1E] hover:bg-[#0A1220] rounded-xl transition-colors group"
              >
                <img src={course.thumbnail} alt={course.title} className="w-16 h-11 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate group-hover:text-blue-300 transition-colors">
                    {course.title}
                  </p>
                  <p className="text-white/35 text-xs flex items-center gap-2 mt-0.5">
                    {course.category} · {course.videos.length} videos
                  </p>
                </div>
                <ChevronRight size={16} className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
