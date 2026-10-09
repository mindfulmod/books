import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ReadingBoundary, ReadingLoading } from "./ReadingBoundary";
import "./styles.css";
import "./system.css";
import "./city-deep.css";
import "./reading/experiences/studies.css";
import "./reading-theme.css";
import "./reading-home.css";
import "./reading/editorial.css";
import "./reading/publication.css";
import "./reading/garden.css";
import "./reading/visual-reading.css";
import "./reading/reader-quality.css";
import "./reading/reading-upgrades.css";
import "./reading/reader-opening.css";
import "./reading/editorial-trial.css";
import "./reading/reading-ornament.css";
import "./reading/reading-comfort.css";
import "./reading/reading-flow.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const currentPath = window.location.pathname;
const routePath = basePath && currentPath.startsWith(basePath)
  ? currentPath.slice(basePath.length) || "/"
  : currentPath;
const isSystemRoute = routePath.startsWith("/system") || (import.meta.env.PROD && routePath === "/");
const SystemReader = lazy(() => import('./SystemApp'));
const LegacyReader = lazy(() => import('./App'));
const Reader = isSystemRoute ? SystemReader : LegacyReader;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReadingBoundary><Suspense fallback={<ReadingLoading/>}><Reader/></Suspense></ReadingBoundary>
  </StrictMode>,
);
