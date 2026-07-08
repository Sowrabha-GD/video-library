import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Rocket, CheckCircle, GraduationCap, Star, Users, Play } from "lucide-react";
import { HeroCarousel } from "../components/site/HeroCarousel";
import { SectionHeader } from "../components/site/SectionHeader";
import { CourseCard } from "../components/course/CourseCard";
import { CategoryGrid, type CategorySummary } from "../components/site/CategoryGrid";
import coursesData from "../data/courses.json";
import type { Course } from "../types/course";

export function HomePage() {
  const courses = coursesData as Course[];

  const categories = useMemo<CategorySummary[]>(() => {
    const names = Array.from(new Set(courses.map((course) => course.category)));
    return names.map((name) => ({
      name,
      count: courses.filter((course) => course.category === name).length,
    }));
  }, [courses]);

  // No "featured" flag exists in the flat data model, so the first few
  // courses in the catalog are treated as featured/hero content.
  const featuredCourses = useMemo(() => courses.slice(0, 4), [courses]);
  const heroCourses = featuredCourses;

  // No enrollment/rating data exists either, so "popular" just surfaces
  // a different slice of the catalog than "featured" so the sections don't repeat.
  const popularCourses = useMemo(() => courses.slice(-4).reverse(), [courses]);

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel courses={heroCourses} />

      {/* Stats Bar */}
      <div className="bg-[#080F1E] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/[0.05]">
            {[
              { value: `${courses.length}`, label: "Expert Courses", icon: <GraduationCap size={18} className="text-violet-400" /> },
              { value: `${categories.length}`, label: "Categories", icon: <Users size={18} className="text-blue-400" /> },
              { value: `${courses.reduce((sum, c) => sum + c.videos.length, 0)}`, label: "Video Lessons", icon: <Play size={18} className="text-emerald-400" /> },
              { value: "4.9", label: "Avg. Rating", icon: <Star size={18} className="text-amber-400" /> },
            ].map((s) => (
              <div key={s.label} className="md:px-8 first:pl-0 last:pr-0 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center">
                  {s.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-xl">{s.value}</div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <SectionHeader
          title="Featured Courses"
          subtitle="Hand-picked courses by Jeet Singh for every stage of your Salesforce journey."
          linkTo="/library"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <SectionHeader
          title="Browse by Category"
          subtitle="Every corner of the Salesforce ecosystem, taught from real-world experience."
          linkTo="/library"
        />
        <CategoryGrid categories={categories} />
      </section>

      {/* Popular Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <SectionHeader
          title="Most Popular"
          subtitle="The courses your peers are completing right now."
          linkTo="/library"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Instructor Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0D1525] via-[#0F1E3A] to-[#0D1525] border border-white/[0.07] p-8 md:p-12">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                  alt="Jeet Singh"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover ring-2 ring-blue-500/30"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl px-2.5 py-1 text-white text-xs font-bold shadow-lg">
                  CTA
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Your Instructor</p>
              <h2 className="text-white text-3xl font-extrabold mb-2">Jeet Singh</h2>
              <p className="text-white/50 text-sm mb-4">Salesforce Architect · Founder of Wizdin</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {["CTA", "MuleSoft Integration Architect", "CPQ Specialist", "Platform Dev II"].map((cert) => (
                  <span key={cert} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium">
                    {cert}
                  </span>
                ))}
              </div>
              <a
                href="https://jeet-singh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white text-sm font-semibold transition-all"
              >
                Visit jeet-singh.com
              </a>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-3 flex-shrink-0">
              {[
                { val: `${courses.length}`, lbl: "Courses" },
                { val: `${categories.length}`, lbl: "Categories" },
              ].map((s) => (
                <div key={s.lbl} className="bg-white/[0.04] rounded-xl p-4 text-center w-28">
                  <div className="text-white font-bold text-xl">{s.val}</div>
                  <div className="text-white/35 text-xs mt-1">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="relative rounded-3xl overflow-hidden text-center py-20 px-6">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-violet-600/15 to-[#0D1525]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
              <Rocket size={16} />
              Start your Salesforce journey today
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              From Admin to Architect —<br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                every step covered.
              </span>
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Learn Salesforce with Wizdin's video courses, taught by Jeet Singh.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                to="/library"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white font-bold text-lg shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5"
              >
                Explore All Courses
              </Link>
              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-xl bg-white/[0.07] hover:bg-white/[0.11] border border-white/[0.12] text-white font-semibold text-lg transition-all"
              >
                Dashboard
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 text-white/40 text-sm">
              {["No subscription needed", "Lifetime access", "Updated regularly"].map((f) => (
                <span key={f} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-500" /> {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
