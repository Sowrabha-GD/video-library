import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Play, ChevronLeft, ChevronRight,
  List, X, Clock, GraduationCap, CheckCircle2
} from "lucide-react";
import coursesData from "../data/courses.json";
import type { Course, Video } from "../types/course";

export function WatchPage() {
  const { courseId, videoId } = useParams<{ courseId: string; videoId: string }>();
  const [playlistOpen, setPlaylistOpen] = useState(true);

  const courses = coursesData as Course[];
  const course = useMemo(() => courses.find((c) => c.id === courseId), [courses, courseId]);

  const videos: Video[] = course?.videos ?? [];
  const currentVideo = useMemo(() => videos.find((v) => v.youtubeId === videoId), [videos, videoId]);
  const currentIndex = useMemo(() => videos.findIndex((v) => v.youtubeId === videoId), [videos, videoId]);

  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo = currentIndex >= 0 && currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;

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
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  key={currentVideo.youtubeId}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-5">
              <div className="mb-5">
                <div className="flex items-center gap-2 text-xs text-white/35 mb-2">
                  <span>Video {currentIndex + 1} of {videos.length}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {currentVideo.title}
                </h1>
                <p className="text-white/45 text-sm mt-2 flex items-center gap-2">
                  <Clock size={13} /> {currentVideo.duration}
                </p>
              </div>

              {/* Prev / Next */}
              <div className="flex items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
                {prevVideo ? (
                  <Link
                    to={`/watch/${course.id}/${prevVideo.youtubeId}`}
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
                    to={`/watch/${course.id}/${nextVideo.youtubeId}`}
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
                    <CheckCircle2 size={16} /> Course Complete!
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
                <p className="text-white/35 text-xs mt-0.5">{videos.length} videos</p>
              </div>
              <button
                onClick={() => setPlaylistOpen(false)}
                className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Videos */}
            <div className="flex-1 overflow-y-auto">
              {videos.map((video, vi) => {
                const isCurrent = video.youtubeId === videoId;

                return (
                  <Link
                    key={video.youtubeId}
                    to={`/watch/${course.id}/${video.youtubeId}`}
                    className={`flex items-start gap-3 px-4 py-3 transition-all border-b border-white/[0.03] ${
                      isCurrent
                        ? "bg-blue-500/10 border-l-2 border-l-blue-500"
                        : "hover:bg-white/[0.03] border-l-2 border-l-transparent"
                    }`}
                  >
                    {/* Index / status icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {isCurrent ? (
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center">
                          <Play size={9} className="text-blue-300 fill-blue-300 ml-0.5" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-white/40 text-[10px] font-semibold">
                          {vi + 1}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium leading-snug line-clamp-2 ${
                        isCurrent ? "text-blue-300" : "text-white/70"
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
          </div>
        )}
      </div>
    </div>
  );
}
