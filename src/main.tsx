
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import MouseGlow from "./components/MouseGlow";
import SmokeCursor from "./components/SmokeCursor";

// createRoot(document.getElementById("root")!).render(<App />);
createRoot(document.getElementById("root")!).render(
  <>
    <SmokeCursor />
    <App />
  </>
);
