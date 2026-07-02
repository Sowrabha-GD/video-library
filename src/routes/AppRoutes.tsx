import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "../components/layout/RootLayout";
import { HomePage } from "../pages/HomePage";
import { LibraryPage } from "../pages/LibraryPage";
import { CoursePage } from "../pages/CoursePage";
import { WatchPage } from "../pages/WatchPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ProfilePage } from "../pages/ProfilePage";
import { NotFoundPage } from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "library", element: <LibraryPage /> },
      { path: "course/:courseId", element: <CoursePage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  // Watch page has its own layout (no navbar overlay)
  { path: "/watch/:courseId/:videoId", element: <WatchPage /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
