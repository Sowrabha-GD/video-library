import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, Star, Users, Clock } from "lucide-react";
import type { Course } from "../../types/course";

interface HeroCarouselProps {
  courses: Course[];
}

export function HeroCarousel({ courses }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % courses.length), [current, courses.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + courses.length) % courses.length), [current, courses.length, goTo]);

  // Reset index if courses array changes (e.g. shrinks after an async fetch)
  useEffect(() => {
    if (current >= courses.length) setCurrent(0);
  }, [courses.length, current]);

  useEffect(() => {
    if (courses.length === 0) return;
    const t = setTimeout(next, 6000);
    return () => clearTimeout(t);
  }, [next, courses.length]);

  if (!courses || courses.length === 0) {
    return (
      <div
        className="relative w-full bg-[#050B18] animate-pulse"
        style={{ minHeight: "85vh" }}
      />
    );
  }

  const course = courses[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: "85vh" }}>
      {/* Background Image with gradient */}
      <div
        key={current}
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        <img
          src={course.heroImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B18] via-[#050B18]/85 to-[#050B18]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-transparent to-[#050B18]/30" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
        style={{ minHeight: "85vh" }}
      >
        <div
          className="max-w-2xl transition-all duration-700"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(20px)" : "translateY(0)",
          }}
        >
          {/* Category pill */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-white"
              style={{ backgroundColor: course.categoryColor + "33", border: `1px solid ${course.categoryColor}55` }}
            >
              {course.category}
            </span>
            {course.isBestseller && (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-400/15 border border-amber-400/30 text-amber-400 tracking-wider uppercase">
                Bestseller
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 tracking-tight">
            {course.title}
          </h1>

          <p className="text-white/65 text-lg mb-8 leading-relaxed max-w-xl">
            {course.shortDescription}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-5 mb-8">
            <div className="flex items-center gap-1.5">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span className="text-amber-400 font-bold">{course.rating}</span>
              <span className="text-white/40 text-sm">({course.reviewsCount.toLocaleString()} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-sm">
              <Users size={15} />
              <span>{course.enrolledCount.toLocaleString()} enrolled</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-sm">
              <Clock size={15} />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-10">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40"
            />
            <div>
              <p className="text-white text-sm font-semibold">{course.instructor.name}</p>
              <p className="text-white/45 text-xs">{course.instructor.title}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Link
              to={`/course/${course.id}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white font-bold transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              <Play size={18} className="fill-white" />
              Start Learning
            </Link>
            <Link
              to={`/course/${course.id}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white font-semibold transition-all backdrop-blur-sm"
            >
              View Course
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {courses.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-blue-400" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}