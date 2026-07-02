import { Link } from "react-router-dom";
import { Star, Clock, Play, BookOpen, Users, Zap, Award } from "lucide-react";
import type { Course } from "../../types/course";

interface CourseCardProps {
  course: Course;
  progress?: number;
  compact?: boolean;
}

export function CourseCard({ course, progress, compact = false }: CourseCardProps) {
  return (
    <Link
      to={`/course/${course.id}`}
      className="group block bg-[#0D1525] hover:bg-[#111C30] border border-white/[0.07] hover:border-white/[0.15] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {course.isBestseller && (
            <span className="px-2.5 py-1 bg-amber-400 text-black text-xs font-bold rounded-lg flex items-center gap-1">
              <Award size={11} /> Bestseller
            </span>
          )}
          {course.isNew && (
            <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1">
              <Zap size={11} /> New
            </span>
          )}
        </div>

        {/* Category tag */}
        <div className="absolute top-3 right-3">
          <span
            className="px-2.5 py-1 text-xs font-semibold rounded-lg text-white"
            style={{ backgroundColor: course.categoryColor + "CC" }}
          >
            {course.category}
          </span>
        </div>

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play size={22} className="text-white fill-white ml-1" />
          </div>
        </div>

        {/* Progress bar */}
        {progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {course.title}
        </h3>

        {!compact && (
          <p className="text-white/45 text-xs mb-3 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        )}

        <p className="text-white/50 text-xs mb-3">{course.instructor.name}</p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Play size={12} /> {course.videoCount} videos
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={12} /> {course.level}
          </span>
        </div>

        {/* Rating + enrolled */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-amber-400 text-xs font-bold">{course.rating}</span>
            <span className="text-white/30 text-xs">({(course.reviewsCount ?? 0).toLocaleString()})</span>
          </div>
          <span className="flex items-center gap-1 text-white/30 text-xs">
            <Users size={11} /> {((course.enrolledCount ?? 0) / 1000).toFixed(1)}k
          </span>
        </div>

        {/* Progress label */}
        {progress !== undefined && progress > 0 && (
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-xs text-white/40">Progress</span>
            <span className="text-xs font-semibold" style={{ color: progress === 100 ? "#10B981" : "#60A5FA" }}>
              {progress === 100 ? "Completed ✓" : `${progress}%`}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}