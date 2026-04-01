import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { ArticleDetail } from "./pages/ArticleDetail";
import { NotFound } from "./pages/NotFound";
import { RedirectToFr } from "./pages/RedirectToFr";

export const router = createBrowserRouter([
  // Root "/" → client-side redirect to /fr (no iframe reload)
  {
    path: "/",
    Component: RedirectToFr,
  },
  // Language-prefixed routes
  {
    path: "/:lang",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "article/:id", Component: ArticleDetail },
    ],
  },
  // Catch-all
  { path: "*", Component: NotFound },
]);

