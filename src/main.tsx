import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// -- code copy protection: disable right-click and certain shortcuts --
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'i' || e.key === 'c')) {
      e.preventDefault();
    }
  });

createRoot(document.getElementById("root")!).render(<App />);