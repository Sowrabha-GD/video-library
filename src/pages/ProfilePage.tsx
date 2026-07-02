import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Clock, Flame, Award, BookOpen, Star, CheckCircle,
  Play, Calendar, Zap, Trophy, TrendingUp, ExternalLink
} from "lucide-react";
import coursesData from "../data/courses.json";
import type { Course, UserProfile } from "../types/course";

export function ProfilePage() {
  const courses = coursesData.courses as Course[];
  const profile = coursesData.userProfile as UserProfile;

  const enrolledCourses = useMemo(() =>
    profile.progress.map((p) => ({
      ...p,
      course: courses.find((c) => c.id === p.courseId)!,
    })).filter((x) => x.course),
  [courses, profile]);

  const completedCourses = useMemo(() =>
    enrolledCourses.filter((x) => x.progressPercent === 100),
  [enrolledCourses]);

  const stats = [
    { icon: <Clock size={22} className="text-blue-400" />, value: `${profile.totalHoursLearned}h`, label: "Hours Learned" },
    { icon: <BookOpen size={22} className="text-violet-400" />, value: enrolledCourses.length, label: "Courses Enrolled" },
    { icon: <CheckCircle size={22} className="text-emerald-400" />, value: completedCourses.length, label: "Completed" },
    { icon: <Award size={22} className="text-amber-400" />, value: profile.certificates.length, label: "Certificates" },
    { icon: <Flame size={22} className="text-orange-400" />, value: `${profile.streak}d`, label: "Streak" },
    { icon: <Star size={22} className="text-yellow-400" />, value: profile.badges.length, label: "Badges" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative mt-8 mb-8">
          {/* Banner */}
          <div className="h-36 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900/40 via-violet-900/40 to-blue-900/40 border border-white/[0.07]">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_30%_50%,_rgba(59,130,246,0.2)_0%,_transparent_70%)]" />
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-10 left-6">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#050B18] border-2 border-blue-500/30"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#050B18]" />
            </div>
          </div>
        </div>

        {/* Name / Bio */}
        <div className="pl-28 pb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">{profile.name}</h1>
            <p className="text-white/50 text-sm mb-1">{profile.title}</p>
            <p className="text-white/35 text-xs flex items-center gap-1">
              <Calendar size={12} />
              Member since {new Date(profile.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium hover:bg-blue-500/15 transition-all"
          >
            <TrendingUp size={15} /> Dashboard
          </Link>
        </div>

        <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-xl">{profile.bio}</p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0D1525] border border-white/[0.07] rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">{s.icon}</div>
              <div className="text-white font-bold text-lg">{s.value}</div>
              <div className="text-white/30 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Streak Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-10 p-6 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/15">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🔥</div>
            <div>
              <p className="text-orange-300 font-extrabold text-2xl">{profile.streak}-Day Streak!</p>
              <p className="text-white/45 text-sm">You've learned something every day for {profile.streak} consecutive days.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Courses */}
          <div>
            <h2 className="text-white font-bold text-xl mb-5 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-400" /> My Courses
            </h2>
            <div className="space-y-4">
              {enrolledCourses.map(({ course, progressPercent, lastWatchedVideoId }) => (
                <div key={course.id} className="bg-[#0D1525] border border-white/[0.07] rounded-xl p-4 flex gap-4">
                  <img src={course.thumbnail} alt={course.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate mb-1">{course.title}</p>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${progressPercent}%`,
                            background: progressPercent === 100
                              ? "linear-gradient(90deg, #10B981, #34D399)"
                              : "linear-gradient(90deg, #3B82F6, #8B5CF6)"
                          }}
                        />
                      </div>
                      <span className={`text-xs font-semibold flex-shrink-0 ${progressPercent === 100 ? "text-emerald-400" : "text-blue-400"}`}>
                        {progressPercent === 100 ? "✓ Done" : `${progressPercent}%`}
                      </span>
                    </div>
                    <Link
                      to={`/watch/${course.id}/${lastWatchedVideoId}`}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                    >
                      <Play size={11} fill="currentColor" />
                      {progressPercent === 100 ? "Rewatch" : "Continue"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates & Badges */}
          <div className="space-y-8">
            {/* Certificates */}
            <div>
              <h2 className="text-white font-bold text-xl mb-5 flex items-center gap-2">
                <Award size={18} className="text-amber-400" /> Certificates
              </h2>
              {profile.certificates.length === 0 ? (
                <p className="text-white/30 text-sm">Complete courses to earn certificates.</p>
              ) : (
                <div className="space-y-3">
                  {profile.certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="relative p-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-amber-500/10 blur-2xl" />
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy size={16} className="text-amber-400" />
                            <span className="text-amber-300 text-xs font-bold tracking-wider uppercase">Certificate of Completion</span>
                          </div>
                          <p className="text-white font-semibold text-sm mb-1">{cert.courseTitle}</p>
                          <p className="text-white/35 text-xs">
                            Issued {new Date(cert.issuedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </p>
                          <p className="font-mono text-white/20 text-xs mt-2">{cert.credentialId}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Badges */}
            <div>
              <h2 className="text-white font-bold text-xl mb-5 flex items-center gap-2">
                <Zap size={18} className="text-violet-400" /> Badges Earned
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {profile.badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center gap-2 p-4 bg-[#0D1525] border border-white/[0.07] rounded-xl text-center hover:border-violet-500/20 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                      <Zap size={22} className="text-violet-400" />
                    </div>
                    <p className="text-white text-xs font-semibold leading-tight">{badge.title}</p>
                    <p className="text-white/30 text-xs leading-tight">{badge.description}</p>
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
