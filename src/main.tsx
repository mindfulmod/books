import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import SystemApp from "./SystemApp";
import "./styles.css";
import "./system.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const currentPath = window.location.pathname;
const routePath = basePath && currentPath.startsWith(basePath)
  ? currentPath.slice(basePath.length) || "/"
  : currentPath;
const isSystemRoute = routePath.startsWith("/system") || (import.meta.env.PROD && routePath === "/");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isSystemRoute ? <SystemApp /> : <App />}
  </StrictMode>,
);
