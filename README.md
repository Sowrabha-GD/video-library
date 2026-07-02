# Wizdin Video Library

Premium Salesforce video learning platform built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — strict type safety
- **Vite 6** — instant dev server & optimised builds
- **Tailwind CSS v4** — utility-first styling with `@tailwindcss/vite`
- **React Router DOM v7** — client-side routing
- **Lucide React** — consistent icon system

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── components/
│   ├── site/           # Navbar, Footer, HeroCarousel, CategoryGrid, etc.
│   ├── course/         # CourseCard, VideoCard
│   ├── dashboard/      # Widget components
│   ├── profile/        # Profile components
│   └── layout/         # RootLayout
├── pages/
│   ├── HomePage.tsx
│   ├── LibraryPage.tsx
│   ├── CoursePage.tsx
│   ├── WatchPage.tsx
│   ├── DashboardPage.tsx
│   ├── ProfilePage.tsx
│   └── NotFoundPage.tsx
├── routes/
│   └── AppRoutes.tsx
├── data/
│   └── courses.json    # All content — no hardcoded data in pages
├── types/
│   └── course.ts       # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css
```

## Routes

| Path | Page |
|------|------|
| `/` | Home — Hero carousel, featured courses, categories, tracks, CTA |
| `/library` | Library — search, category filter, sort |
| `/course/:courseId` | Course detail — info, modules, video list |
| `/watch/:courseId/:videoId` | Video player — playlist sidebar, progress tracking |
| `/dashboard` | Dashboard — progress, activity, recommendations |
| `/profile` | Profile — stats, certificates, badges |

## Adding Courses

Edit `src/data/courses.json`. All pages derive data from this file — no page-level hardcoding.

## Design System

- Background: `#050B18`
- Card: `#0D1525`  
- Primary: `#3B82F6` (blue) + `#8B5CF6` (violet) gradients
- Typography: Inter, weights 400–900
- Glassmorphism: `.glass` utility class
- Radius: `rounded-xl` (12px) and `rounded-2xl` (16px) throughout

## Production Notes

1. Replace the simulated video player in `WatchPage.tsx` with a YouTube/Vimeo iframe embed or a React video player library.
2. Replace `courses.json` with a real API (Sanity CMS, Contentful, or custom backend).
3. Add real auth (Clerk, Auth0) and replace the mock `userProfile` with authenticated session data.
4. Enable `@tailwindcss/vite` in `vite.config.ts` (already configured).

## Creator

Built for **Jeet Singh** — Salesforce CTA, 12x Certified, [jeet-singh.com](https://jeet-singh.com)
