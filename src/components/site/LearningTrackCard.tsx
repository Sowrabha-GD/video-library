import { Link } from "react-router-dom";
import { Settings, Code2, Layers, Clock, BookOpen, ChevronRight } from "lucide-react";
import type { LearningTrack, Course } from "../../types/course";

const iconMap: Record<string, React.ReactNode> = {
  Settings: <Settings size={20} />,
  Code2: <Code2 size={20} />,
  Layers: <Layers size={20} />,
};

interface LearningTrackCardProps {
  track: LearningTrack;
  courses: Course[];
}

export function LearningTrackCard({ track, courses }: LearningTrackCardProps) {
  const trackCourses = courses.filter((c) => track.courses.includes(c.id));

  return (
    <div className="relative p-6 rounded-2xl bg-[#0D1525] border border-white/[0.07] hover:border-white/[0.15] transition-all overflow-hidden group">
      {/* Gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${track.color}, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: track.color + "22", color: track.color }}
          >
            {iconMap[track.icon] ?? <BookOpen size={20} />}
          </div>
          <div>
            <h3 className="text-white font-bold text-base leading-tight">{track.title}</h3>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-md mt-1 inline-block"
              style={{ backgroundColor: track.color + "18", color: track.color }}
            >
              {track.level}
            </span>
          </div>
        </div>
      </div>

      <p className="text-white/45 text-sm leading-relaxed mb-5">{track.description}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-5 text-sm">
        <span className="flex items-center gap-1.5 text-white/40">
          <BookOpen size={14} /> {track.courses.length} courses
        </span>
        <span className="flex items-center gap-1.5 text-white/40">
          <Clock size={14} /> {track.totalDuration}
        </span>
      </div>

      {/* Course thumbnails */}
      <div className="flex items-center gap-2 mb-5">
        {trackCourses.slice(0, 3).map((course) => (
          <img
            key={course.id}
            src={course.thumbnail}
            alt={course.title}
            className="w-12 h-8 object-cover rounded-lg border border-white/[0.1]"
          />
        ))}
        {trackCourses.length > 3 && (
          <div className="w-12 h-8 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white/40 text-xs font-semibold">
            +{trackCourses.length - 3}
          </div>
        )}
      </div>

      <Link
        to="/library"
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all"
        style={{ color: track.color }}
      >
        Start Track
        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
