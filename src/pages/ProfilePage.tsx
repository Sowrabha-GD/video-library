import { useMemo } from "react";
import { BookOpen, Play, Layers, User, Award } from "lucide-react";
import coursesData from "../data/courses.json";
import type { Course } from "../types/course";

const INSTRUCTOR = {
  name: "Jeet Singh",
  title: "Salesforce Architect",
  tagline: "Founder of Wizdin",
};

export function ProfilePage() {
  const courses = coursesData as Course[];

  const totalVideos = useMemo(
    () => courses.reduce((sum, c) => sum + c.videos.length, 0),
    [courses]
  );

  const categories = useMemo(
    () => Array.from(new Set(courses.map((c) => c.category))),
    [courses]
  );

  const stats = [
    { icon: <BookOpen size={22} className="text-blue-400" />, value: courses.length, label: "Total Courses" },
    { icon: <Play size={22} className="text-violet-400" />, value: totalVideos, label: "Total Videos" },
    { icon: <Layers size={22} className="text-emerald-400" />, value: categories.length, label: "Categories" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative mt-8 mb-8">
          {/* Banner */}
          <div className="h-36 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900/40 via-violet-900/40 to-blue-900/40 border border-white/[0.07]">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_30%_50%,_rgba(59,130,246,0.2)_0%,_transparent_70%)]" />
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-10 left-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/15 border-2 border-blue-500/30 ring-4 ring-[#050B18] flex items-center justify-center">
                <User size={32} className="text-blue-300" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#050B18]" />
            </div>
          </div>
        </div>

        {/* Name / Bio */}
        <div className="pl-28 pb-6">
          <h1 className="text-2xl font-extrabold text-white">{INSTRUCTOR.name}</h1>
          <p className="text-white/50 text-sm mb-1">{INSTRUCTOR.title}</p>
          <p className="text-white/35 text-xs">{INSTRUCTOR.tagline}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0D1525] border border-white/[0.07] rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">{s.icon}</div>
              <div className="text-white font-bold text-lg">{s.value}</div>
              <div className="text-white/30 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Founder banner */}
        <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-blue-500/10 border border-blue-500/15">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <Award size={26} className="text-blue-300" />
            </div>
            <div>
              <p className="text-blue-300 font-extrabold text-lg">Wizdin Video Library</p>
              <p className="text-white/45 text-sm">
                Built and taught by {INSTRUCTOR.name} — {INSTRUCTOR.title.toLowerCase()} and {INSTRUCTOR.tagline.toLowerCase()}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
