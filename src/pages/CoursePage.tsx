import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Play, ChevronRight, BookOpen, Layers, User } from "lucide-react";
import coursesData from "../data/courses.json";
import { CourseCard } from "../components/course/CourseCard";
import type { Course } from "../types/course";

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const courses = coursesData as unknown as Course[];
  const course = useMemo(() => courses.find((c) => c.id === courseId), [courses, courseId]);

  if (!course) return <Navigate to="/library" replace />;

  const firstVideo = course.videos[0];
  const suggested = (course.suggestedCourses ?? [])
    .map((id) => courses.find((c) => c.id === id))
    .filter((c): c is Course => Boolean(c));

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#060E1F] to-[#050B18]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={course.thumbnail} alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050B18]/80 via-[#050B18]/70 to-[#050B18]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT: Course info */}
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-white/40 mb-5">
                <Link to="/library" className="hover:text-white/70 transition-colors">Library</Link>
                <ChevronRight size={14} />
                <Link
                  to={`/library?category=${encodeURIComponent(course.category)}`}
                  className="hover:text-white/70 transition-colors"
                >
                  {course.category}
                </Link>
                <ChevronRight size={14} />
                <span className="text-white/60 truncate max-w-xs">{course.title}</span>
              </div>

              {/* Category badge */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-bold text-blue-300 bg-blue-500/15 border border-blue-500/30">
                  {course.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-white/60 text-base leading-relaxed mb-6 max-w-2xl">
                {course.description}
              </p>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                  <User size={18} className="text-blue-300" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{course.instructor}</p>
                  <p className="text-white/40 text-xs">Instructor</p>
                </div>
              </div>
            </div>

            {/* RIGHT: Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-[#0D1525] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center">
                      <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { icon: <Play size={15} />, label: "Videos", value: `${course.videos.length} lessons` },
                      { icon: <Layers size={15} />, label: "Category", value: course.category },
                    ].map((s) => (
                      <div key={s.label} className="bg-[#080F1E] rounded-xl p-3">
                        <div className="flex items-center gap-1.5 text-white/35 text-xs mb-1">
                          {s.icon} {s.label}
                        </div>
                        <div className="text-white text-sm font-semibold">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {firstVideo && (
                    <Link
                      to={`/watch/${course.id}/${firstVideo.youtubeId}`}
                      className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white font-bold transition-all shadow-lg shadow-blue-500/25 mb-3"
                    >
                      <Play size={18} className="fill-white" />
                      Start Watching
                    </Link>
                  )}
                  <Link
                    to="/library"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.09] border border-white/[0.08] text-white/70 text-sm font-medium transition-all"
                  >
                    <BookOpen size={15} /> Browse More Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-6">Course Videos</h2>
          <p className="text-white/40 text-sm mb-6">{course.videos.length} videos</p>

          <div className="border border-white/[0.07] rounded-2xl overflow-hidden divide-y divide-white/[0.04]">
            {course.videos.map((video, vi) => (
              <Link
                key={video.youtubeId}
                to={`/watch/${course.id}/${video.youtubeId}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Index badge */}
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 text-xs font-bold flex items-center justify-center">
                  {vi + 1}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-white/80">{video.title}</p>
                  <p className="text-white/35 text-xs mt-0.5">{video.duration}</p>
                </div>

                {/* Action */}
                <div className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/20 text-blue-300 text-xs font-semibold flex items-center gap-1.5">
                  <Play size={12} className="fill-current" />
                  Watch
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Suggested courses */}
        {suggested.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Suggested Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {suggested.map((s) => (
                <CourseCard key={s.id} course={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
