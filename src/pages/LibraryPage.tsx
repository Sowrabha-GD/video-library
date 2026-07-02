import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { CourseCard } from "../components/course/CourseCard";
import coursesData from "../data/courses.json";
import type { Course } from "../types/course";

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "duration-asc", label: "Shortest First" },
];

export function LibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") ?? "All");
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const courses = coursesData.courses as Course[];
  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

  // Sync search param
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((c) => c.category === activeCategory);
    }

    if (activeLevel !== "All Levels") {
      result = result.filter((c) => c.level === activeLevel || c.level === "All Levels");
    }

    switch (sortBy) {
      case "popular": result.sort((a, b) => b.enrolledCount - a.enrolledCount); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()); break;
      case "duration-asc": result.sort((a, b) => a.videoCount - b.videoCount); break;
    }

    return result;
  }, [courses, query, activeCategory, activeLevel, sortBy]);

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("All");
    setActiveLevel("All Levels");
    setSortBy("popular");
    setSearchParams({});
  };

  const hasFilters = query || activeCategory !== "All" || activeLevel !== "All Levels";

  return (
    <div className="min-h-screen pt-20">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-[#0A1628] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-extrabold text-white mb-2">Course Library</h1>
          <p className="text-white/45 text-lg mb-8">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} — every layer of Salesforce.
          </p>

          {/* Search bar */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-[#0D1525] border border-white/[0.1] rounded-xl overflow-hidden focus-within:border-blue-500/50 transition-colors">
              <Search size={18} className="ml-4 text-white/35 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, topics, or skills..."
                className="flex-1 bg-transparent px-3 py-3.5 text-white placeholder-white/30 outline-none text-sm"
              />
              {query && (
                <button onClick={() => setQuery("")} className="mr-3 text-white/35 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                showFilters
                  ? "bg-blue-500/15 border-blue-500/40 text-blue-300"
                  : "bg-[#0D1525] border-white/[0.1] text-white/60 hover:text-white"
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 p-5 bg-[#0D1525] rounded-2xl border border-white/[0.07]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Level filter */}
                <div>
                  <label className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2 block">Level</label>
                  <div className="flex flex-wrap gap-2">
                    {LEVELS.map((l) => (
                      <button
                        key={l}
                        onClick={() => setActiveLevel(l)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          activeLevel === l
                            ? "bg-blue-500 text-white"
                            : "bg-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.09]"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2 block">Sort by</label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-[#080F1E] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white outline-none appearance-none cursor-pointer"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                  </div>
                </div>

                {/* Clear */}
                {hasFilters && (
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all"
                    >
                      <X size={14} /> Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-[#0D1525] border border-white/[0.07] text-white/55 hover:text-white hover:border-white/[0.15]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-white/20" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-white/40 mb-6">Try adjusting your search or removing filters.</p>
            <button onClick={clearFilters} className="px-5 py-2.5 bg-blue-500/15 border border-blue-500/30 text-blue-300 rounded-xl text-sm font-medium hover:bg-blue-500/25 transition-all">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
