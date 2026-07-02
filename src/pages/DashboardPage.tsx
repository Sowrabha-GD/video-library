import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Play, Clock, Flame, Award, BookOpen, TrendingUp, CheckCircle,
  Star, BarChart2, Calendar, ChevronRight, Zap
} from "lucide-react";
import coursesData from "../data/courses.json";
import type { Course, UserProfile } from "../types/course";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ACTIVITY = [45, 30, 60, 20, 75, 90, 55]; // minutes per day

export function DashboardPage() {
  const courses = coursesData.courses as Course[];
  const profile = coursesData.userProfile as UserProfile;

  const inProgressCourses = useMemo(() =>
    profile.progress
      .filter((p) => p.progressPercent > 0 && p.progressPercent < 100)
      .map((p) => ({
        ...p,
        course: courses.find((c) => c.id === p.courseId)!,
      }))
      .filter((x) => x.course),
  [courses, profile]);

  const completedCourses = useMemo(() =>
    profile.progress
      .filter((p) => p.progressPercent === 100)
      .map((p) => courses.find((c) => c.id === p.courseId)!)
      .filter(Boolean),
  [courses, profile]);

  const recommended = useMemo(() =>
    courses
      .filter((c) => !profile.progress.find((p) => p.courseId === c.id))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3),
  [courses, profile]);

  const recentActivity = [
    { text: `Watched "Trigger Handler Pattern"`, course: "The Apex Playbook", time: "2h ago", icon: <Play size={14} className="text-blue-400" /> },
    { text: `Completed "Salesforce Flows Playbook"`, course: "Flows", time: "4h ago", icon: <CheckCircle size={14} className="text-emerald-400" /> },
    { text: `Earned "Flow Master" badge`, course: "", time: "4h ago", icon: <Zap size={14} className="text-amber-400" /> },
    { text: `Watched "LWC Architecture & Shadow DOM"`, course: "LWC Guide", time: "1d ago", icon: <Play size={14} className="text-blue-400" /> },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-10">
          <div className="flex items-center gap-4 mb-1">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome back, {profile.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-white/40 text-sm">Keep up the momentum — you're on a {profile.streak}-day streak.</p>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Clock size={20} className="text-blue-400" />, value: `${profile.totalHoursLearned}h`, label: "Hours Learned", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/15" },
            { icon: <Flame size={20} className="text-orange-400" />, value: `${profile.streak} days`, label: "Current Streak", bg: "from-orange-500/10 to-orange-500/5", border: "border-orange-500/15" },
            { icon: <BookOpen size={20} className="text-violet-400" />, value: `${profile.totalCoursesCompleted}`, label: "Completed", bg: "from-violet-500/10 to-violet-500/5", border: "border-violet-500/15" },
            { icon: <Award size={20} className="text-emerald-400" />, value: `${profile.certificates.length}`, label: "Certificates", bg: "from-emerald-500/10 to-emerald-500/5", border: "border-emerald-500/15" },
          ].map((s) => (
            <div key={s.label} className={`relative p-5 rounded-2xl bg-gradient-to-br ${s.bg} border ${s.border} overflow-hidden`}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
                  {s.icon}
                </div>
              </div>
              <div className="text-2xl font-extrabold text-white mb-0.5">{s.value}</div>
              <div className="text-white/40 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <div className="bg-[#0D1525] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                <Play size={18} className="text-blue-400" /> Continue Learning
              </h2>
              {inProgressCourses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/30 text-sm mb-3">No courses in progress.</p>
                  <Link to="/library" className="text-blue-400 text-sm hover:underline">Browse courses →</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {inProgressCourses.map(({ course, progressPercent, lastWatchedVideoId }) => (
                    <div key={course.id} className="flex gap-4 p-4 bg-[#080F1E] rounded-xl hover:bg-[#0A1220] transition-colors">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm truncate mb-1">{course.title}</h3>
                        <p className="text-white/40 text-xs mb-3 flex items-center gap-1.5">
                          <Clock size={11} /> {course.duration}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-xs text-blue-400 font-semibold flex-shrink-0">{progressPercent}%</span>
                        </div>
                      </div>
                      <Link
                        to={`/watch/${course.id}/${lastWatchedVideoId}`}
                        className="flex-shrink-0 self-center p-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/20 text-blue-400 transition-all"
                      >
                        <Play size={16} className="fill-current" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Weekly Activity */}
            <div className="bg-[#0D1525] border border-white/[0.07] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <BarChart2 size={18} className="text-violet-400" /> Weekly Progress
                </h2>
                <span className="text-white/30 text-xs flex items-center gap-1">
                  <Calendar size={12} /> This week
                </span>
              </div>
              <div className="flex items-end gap-3 h-28">
                {DAYS.map((day, i) => {
                  const height = (ACTIVITY[i] / 90) * 100;
                  const isToday = i === 6;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center" style={{ height: "80px" }}>
                        <div
                          className={`w-full rounded-t-lg transition-all duration-700 ${
                            isToday
                              ? "bg-gradient-to-t from-blue-600 to-blue-400"
                              : "bg-gradient-to-t from-blue-900/60 to-blue-700/40"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className={`text-xs ${isToday ? "text-blue-400 font-semibold" : "text-white/25"}`}>{day}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between text-sm">
                <span className="text-white/35">Total this week</span>
                <span className="text-white font-bold">{ACTIVITY.reduce((a, b) => a + b, 0)} min</span>
              </div>
            </div>

            {/* Recommended */}
            <div className="bg-[#0D1525] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                <TrendingUp size={18} className="text-amber-400" /> Recommended for You
              </h2>
              <div className="space-y-3">
                {recommended.map((course) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="flex items-center gap-4 p-3.5 bg-[#080F1E] hover:bg-[#0A1220] rounded-xl transition-colors group"
                  >
                    <img src={course.thumbnail} alt={course.title} className="w-14 h-10 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate group-hover:text-blue-300 transition-colors">{course.title}</p>
                      <p className="text-white/35 text-xs flex items-center gap-2">
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                        {course.rating} · {course.duration}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: 1/3 */}
          <div className="space-y-6">
            {/* Certificates */}
            <div className="bg-[#0D1525] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <Award size={16} className="text-emerald-400" /> Certificates
              </h2>
              {profile.certificates.length === 0 ? (
                <p className="text-white/30 text-sm">Complete a course to earn your first certificate.</p>
              ) : (
                <div className="space-y-3">
                  {profile.certificates.map((cert) => (
                    <div key={cert.id} className="p-4 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Award size={16} className="text-emerald-400" />
                        <span className="text-emerald-300 text-xs font-bold">CERTIFICATE</span>
                      </div>
                      <p className="text-white text-sm font-semibold leading-tight mb-1">{cert.courseTitle}</p>
                      <p className="text-white/35 text-xs">
                        {new Date(cert.issuedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <p className="text-white/20 text-xs font-mono mt-2">{cert.credentialId}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="bg-[#0D1525] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <Star size={16} className="text-amber-400" /> Badges
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {profile.badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center gap-2 p-3 bg-[#080F1E] rounded-xl text-center">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
                      <Zap size={18} className="text-amber-400" />
                    </div>
                    <p className="text-white/60 text-xs leading-tight">{badge.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#0D1525] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/70 text-xs leading-snug">{item.text}</p>
                      {item.course && <p className="text-white/30 text-xs mt-0.5">{item.course}</p>}
                    </div>
                    <span className="text-white/25 text-xs flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
