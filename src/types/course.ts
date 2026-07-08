export interface Video {
  title: string;
  youtubeId: string;
  duration: string; // e.g. "12 min"
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  instructor: string;
  category: string;
  videos: Video[];
  suggestedCourses?: string[];
}