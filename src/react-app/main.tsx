import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Design System — import theo thứ tự: tokens → themes → base → components
import "./styles/tokens.css";
import "./styles/themes.css";
import "./styles/base.css";
import "./styles/components.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
