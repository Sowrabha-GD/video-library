import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Play, CheckCircle, ChevronLeft, ChevronRight,
  List, X, Clock, BookOpen, Award, GraduationCap
} from "lucide-react";
import coursesData from "../data/courses.json";
import type { Course, Video } from "../types/course";

export function WatchPage() {
  const { courseId, videoId } = useParams<{ courseId: string; videoId: string }>();
  const navigate = useNavigate();
  const [playlistOpen, setPlaylistOpen] = useState(true);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const courses = coursesData.courses as Course[];
  const course = useMemo(() => courses.find((c) => c.id === courseId), [courses, courseId]);

  // Flatten all videos
  const allVideos = useMemo(() => {
    if (!course) return [] as Video[];
    return course.modules.flatMap((m) => m.videos);
  }, [course]);

  const currentVideo = useMemo(() => allVideos.find((v) => v.id === videoId), [allVideos, videoId]);
  const currentIndex = useMemo(() => allVideos.findIndex((v) => v.id === videoId), [allVideos, videoId]);

  const prevVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;

  // Load progress from "store"
  useEffect(() => {
    const profile = coursesData.userProfile;
    const progress = profile.progress.find((p) => p.courseId === courseId);
    if (progress) {
      setCompletedIds(new Set(progress.completedVideoIds));
    }
  }, [courseId]);

  const progressPercent = useMemo(() => {
    if (!allVideos.length) return 0;
    return Math.round((completedIds.size / allVideos.length) * 100);
  }, [completedIds, allVideos]);

  const markComplete = () => {
    if (!videoId) return;
    setCompletedIds((prev) => new Set([...prev, videoId]));
  };

  if (!course || !currentVideo) {
    return (
      <div className="min-h-screen bg-[#050B18] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">Video not found.</p>
          <Link to="/library" className="text-blue-400 hover:text-blue-300">← Back to library</Link>
        </div>
      </div>
    );
  }

  // Find module for current video
  const currentModule = course.modules.find((m) => m.videos.some((v) => v.id === videoId));

  return (
    <div className="min-h-screen bg-[#030811] text-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#050B18] border-b border-white/[0.06] flex items-center gap-3 px-4 py-3 flex-shrink-0">
        <Link
          to={`/course/${course.id}`}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Course</span>
        </Link>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <GraduationCap size={15} className="text-blue-400 flex-shrink-0" />
          <span className="text-white/70 text-sm truncate">{course.title}</span>
        </div>

        {/* Progress */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-32 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-white/40 text-xs">{progressPercent}%</span>
          </div>
        </div>

        <button
          onClick={() => setPlaylistOpen(!playlistOpen)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            playlistOpen
              ? "bg-blue-500/15 text-blue-300 border border-blue-500/20"
              : "bg-white/[0.06] text-white/50 hover:text-white border border-white/[0.08]"
          }`}
        >
          <List size={14} />
          <span className="hidden sm:inline">Playlist</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Video Player */}
          <div className="bg-black">
            <div className="max-w-5xl mx-auto w-full">
              <div className="relative aspect-video w-full bg-[#0A0E1A]">
                {/* Simulated video player */}
                <img
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mb-4 mx-auto hover:bg-white/20 cursor-pointer transition-all">
                      <Play size={32} className="text-white fill-white ml-2" />
                    </div>
                    <p className="text-white/60 text-sm">Video player would embed here</p>
                    <p className="text-white/30 text-xs mt-1">Connect YouTube/Vimeo embed in production</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-white/35 mb-2">
                    <span>{currentModule?.title}</span>
                    <span>·</span>
                    <span>Video {currentIndex + 1} of {allVideos.length}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {currentVideo.title}
                  </h1>
                  <p className="text-white/45 text-sm mt-2 flex items-center gap-2">
                    <Clock size={13} /> {currentVideo.duration}
                  </p>
                </div>

                {/* Mark complete */}
                <button
                  onClick={markComplete}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    completedIds.has(videoId!)
                      ? "bg-emerald-500/15 border border-emerald-500/25 text-emerald-400"
                      : "bg-white/[0.06] border border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.09]"
                  }`}
                >
                  <CheckCircle size={16} />
                  {completedIds.has(videoId!) ? "Completed" : "Mark Complete"}
                </button>
              </div>

              <p className="text-white/55 text-sm leading-relaxed mb-6">{currentVideo.description}</p>

              {/* Prev / Next */}
              <div className="flex items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
                {prevVideo ? (
                  <Link
                    to={`/watch/${course.id}/${prevVideo.id}`}
                    className="flex items-center gap-3 p-4 bg-[#0D1525] hover:bg-[#111C30] border border-white/[0.07] hover:border-white/[0.15] rounded-xl transition-all max-w-xs group"
                  >
                    <ChevronLeft size={18} className="text-white/40 group-hover:text-white flex-shrink-0 transition-colors" />
                    <div className="min-w-0">
                      <p className="text-white/35 text-xs mb-0.5">Previous</p>
                      <p className="text-white text-sm font-medium truncate">{prevVideo.title}</p>
                    </div>
                  </Link>
                ) : <div />}

                {nextVideo ? (
                  <Link
                    to={`/watch/${course.id}/${nextVideo.id}`}
                    className="flex items-center gap-3 p-4 bg-[#0D1525] hover:bg-[#111C30] border border-white/[0.07] hover:border-white/[0.15] rounded-xl transition-all max-w-xs group ml-auto"
                  >
                    <div className="min-w-0 text-right">
                      <p className="text-white/35 text-xs mb-0.5">Next</p>
                      <p className="text-white text-sm font-medium truncate">{nextVideo.title}</p>
                    </div>
                    <ChevronRight size={18} className="text-white/40 group-hover:text-white flex-shrink-0 transition-colors" />
                  </Link>
                ) : (
                  <Link
                    to={`/course/${course.id}`}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500/15 to-blue-500/15 border border-emerald-500/20 text-emerald-300 rounded-xl text-sm font-semibold transition-all hover:border-emerald-500/40 ml-auto"
                  >
                    <Award size={16} /> Course Complete!
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Sidebar */}
        {playlistOpen && (
          <div className="w-80 xl:w-96 flex-shrink-0 border-l border-white/[0.06] bg-[#050B18] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-white font-semibold text-sm">Course Content</h3>
                <p className="text-white/35 text-xs mt-0.5">
                  {completedIds.size}/{allVideos.length} completed · {progressPercent}%
                </p>
              </div>
              <button
                onClick={() => setPlaylistOpen(false)}
                className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="px-4 py-3 border-b border-white/[0.04]">
              <div className="h-1 bg-white/[0.07] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Videos */}
            <div className="flex-1 overflow-y-auto">
              {course.modules.map((module, mi) => (
                <div key={module.id}>
                  {/* Module label */}
                  <div className="sticky top-0 px-4 py-2.5 bg-[#050B18]/95 backdrop-blur-sm border-b border-white/[0.04] z-10">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                      {mi + 1}. {module.title}
                    </p>
                  </div>

                  {module.videos.map((video, vi) => {
                    const isCurrent = video.id === videoId;
                    const isDone = completedIds.has(video.id);

                    return (
                      <Link
                        key={video.id}
                        to={`/watch/${course.id}/${video.id}`}
                        className={`flex items-start gap-3 px-4 py-3 transition-all border-b border-white/[0.03] ${
                          isCurrent
                            ? "bg-blue-500/10 border-l-2 border-l-blue-500"
                            : "hover:bg-white/[0.03] border-l-2 border-l-transparent"
                        }`}
                      >
                        {/* Status icon */}
                        <div className="flex-shrink-0 mt-0.5">
                          {isDone ? (
                            <CheckCircle size={16} className="text-emerald-400" />
                          ) : isCurrent ? (
                            <div className="w-4 h-4 rounded-full border-2 border-blue-400 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-white/20" />
                          )}
                        </div>

                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium leading-snug line-clamp-2 ${
                            isCurrent ? "text-blue-300" : isDone ? "text-emerald-400/80" : "text-white/70"
                          }`}>
                            {video.title}
                          </p>
                          <p className="text-white/30 text-xs mt-1 flex items-center gap-1">
                            <Clock size={10} /> {video.duration}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
