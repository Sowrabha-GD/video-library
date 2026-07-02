export interface Video {
  id: string;
  title: string;
  duration: string; // e.g. "12:34"
  durationSeconds: number;
  thumbnail: string;
  description: string;
  isPreview?: boolean;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  videos: Video[];
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  heroImage: string;
  category: string;
  categoryColor: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string; // e.g. "14h 32m"
  videoCount: number;
  enrolledCount: number;
  rating: number;
  reviewsCount: number;
  instructor: Instructor;
  modules: Module[];
  skills: string[];
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  lastUpdated: string;
  language: string;
}

export interface UserProgress {
  courseId: string;
  completedVideoIds: string[];
  lastWatchedVideoId: string;
  lastWatchedAt: string;
  progressPercent: number;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  credentialId: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  bio: string;
  joinedAt: string;
  streak: number;
  totalHoursLearned: number;
  totalCoursesCompleted: number;
  progress: UserProgress[];
  certificates: Certificate[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  courseCount: number;
  description: string;
}

export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  courses: string[]; // course IDs
  totalDuration: string;
  level: string;
  color: string;
  icon: string;
}
