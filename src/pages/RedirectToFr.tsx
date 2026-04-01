import { Navigate } from "react-router";

// Client-side redirect component — avoids HTTP-style loader redirect that
// would destroy Figma's iframe message channel on hard navigation.
export function RedirectToFr() {
  return <Navigate to="/fr" replace />;
}
