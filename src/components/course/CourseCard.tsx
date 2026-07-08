import { Link } from "react-router-dom";
import { Play, User, Layers } from "lucide-react";
import type { Course } from "../../types/course";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      to={`/course/${course.id}`}
      className="group bg-[#0D1525] border border-white/[0.07] hover:border-white/[0.15] rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center">
            <Play size={18} className="text-white fill-white ml-0.5" />
          </div>
        </div>
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-sm text-white/80 border border-white/10">
          {course.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-sm leading-snug mb-1.5 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-white/40 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
          {course.description}
        </p>
        <div className="flex items-center justify-between text-xs text-white/35 pt-3 border-t border-white/[0.05]">
          <span className="flex items-center gap-1.5 truncate">
            <User size={12} className="flex-shrink-0" />
            <span className="truncate">{course.instructor}</span>
          </span>
          <span className="flex items-center gap-1.5 flex-shrink-0 ml-2">
            <Layers size={12} />
            {course.videos.length} videos
          </span>
        </div>
      </div>
    </Link>
  );
}
