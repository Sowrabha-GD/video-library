import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  Star, Users, Clock, Play, ChevronRight, Globe, RefreshCw,
  CheckCircle, BookOpen, Layers, Award, Zap, ChevronDown, Lock
} from "lucide-react";
import coursesData from "../data/courses.json";
import type { Course } from "../types/course";

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const courses = coursesData.courses as Course[];
  const course = useMemo(() => courses.find((c) => c.id === courseId), [courses, courseId]);

  if (!course) return <Navigate to="/library" replace />;

  const totalVideos = course.modules.reduce((s, m) => s + m.videos.length, 0);
  const firstVideo = course.modules[0]?.videos[0];
  const progress = coursesData.userProfile.progress.find((p) => p.courseId === courseId);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#060E1F] to-[#050B18]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={course.heroImage} alt="" className="w-full h-full object-cover opacity-10 blur-sm" />
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
                <Link to={`/library?category=${encodeURIComponent(course.category)}`} className="hover:text-white/70 transition-colors">
                  {course.category}
                </Link>
                <ChevronRight size={14} />
                <span className="text-white/60 truncate max-w-xs">{course.title}</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: course.categoryColor + "33", border: `1px solid ${course.categoryColor}55`, color: course.categoryColor }}
                >
                  {course.category}
                </span>
                {course.isBestseller && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 border border-amber-400/30 text-amber-400">
                    ★ Bestseller
                  </span>
                )}
                {course.isNew && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    ⚡ New
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-white/60 text-base leading-relaxed mb-6 max-w-2xl">
                {course.description}
              </p>

              {/* Rating + meta */}
              <div className="flex flex-wrap items-center gap-5 mb-6 text-sm">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-400 font-bold text-base">{course.rating}</span>
                  <span className="text-white/35">({course.reviewsCount.toLocaleString()} reviews)</span>
                </div>
                <span className="flex items-center gap-1.5 text-white/45">
                  <Users size={15} /> {course.enrolledCount.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5 text-white/45">
                  <Globe size={15} /> {course.language}
                </span>
                <span className="flex items-center gap-1.5 text-white/45">
                  <RefreshCw size={15} /> Updated {new Date(course.lastUpdated).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-8">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{course.instructor.name}</p>
                  <p className="text-white/40 text-xs">{course.instructor.title}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-[#0D1525] border border-white/[0.07] rounded-2xl p-5 mb-0">
                <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-400" /> What you'll learn
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {course.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2 text-white/60 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {skill}
                    </div>
                  ))}
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
                      { icon: <Clock size={15} />, label: "Duration", value: course.duration },
                      { icon: <Play size={15} />, label: "Videos", value: `${totalVideos} lessons` },
                      { icon: <Layers size={15} />, label: "Level", value: course.level },
                      { icon: <Award size={15} />, label: "Certificate", value: "Included" },
                    ].map((s) => (
                      <div key={s.label} className="bg-[#080F1E] rounded-xl p-3">
                        <div className="flex items-center gap-1.5 text-white/35 text-xs mb-1">
                          {s.icon} {s.label}
                        </div>
                        <div className="text-white text-sm font-semibold">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar if enrolled */}
                  {progress && progress.progressPercent > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-white/40">Your progress</span>
                        <span className="text-blue-400 font-semibold">{progress.progressPercent}%</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all"
                          style={{ width: `${progress.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {firstVideo && (
                    <Link
                      to={`/watch/${course.id}/${progress?.lastWatchedVideoId ?? firstVideo.id}`}
                      className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white font-bold transition-all shadow-lg shadow-blue-500/25 mb-3"
                    >
                      <Play size={18} className="fill-white" />
                      {progress && progress.progressPercent > 0 ? "Continue Learning" : "Start Learning"}
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

      {/* Modules & Videos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-6">Course Curriculum</h2>
          <p className="text-white/40 text-sm mb-6">
            {course.modules.length} modules · {totalVideos} videos · {course.duration} total
          </p>

          <div className="space-y-4">
            {course.modules.map((module, mi) => (
              <div key={module.id} className="border border-white/[0.07] rounded-2xl overflow-hidden">
                {/* Module header */}
                <div className="bg-[#0D1525] px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 text-xs font-bold flex items-center justify-center">
                      {mi + 1}
                    </span>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{module.title}</h3>
                      <p className="text-white/35 text-xs">{module.videos.length} videos</p>
                    </div>
                  </div>
                </div>

                {/* Videos */}
                <div className="divide-y divide-white/[0.04]">
                  {module.videos.map((video, vi) => {
                    const isCompleted = progress?.completedVideoIds.includes(video.id);
                    const isPreview = video.isPreview;

                    return (
                      <div key={video.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 relative w-20 h-12 rounded-lg overflow-hidden">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                          {isCompleted ? (
                            <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                              <CheckCircle size={16} className="text-emerald-400 fill-emerald-400/20" />
                            </div>
                          ) : (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Play size={12} className="text-white fill-white" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isCompleted ? "text-emerald-400" : "text-white/80"}`}>
                            {vi + 1}. {video.title}
                          </p>
                          <p className="text-white/35 text-xs mt-0.5">{video.duration}</p>
                        </div>

                        {/* Action */}
                        {isPreview || isCompleted ? (
                          <Link
                            to={`/watch/${course.id}/${video.id}`}
                            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/20 text-blue-300 text-xs font-semibold transition-all flex items-center gap-1.5"
                          >
                            <Play size={12} className="fill-current" />
                            {isPreview ? "Preview" : "Watch"}
                          </Link>
                        ) : (
                          <div className="flex-shrink-0 text-white/20">
                            <Lock size={14} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
