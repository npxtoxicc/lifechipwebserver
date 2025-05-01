import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Add meta tags for mobile optimization
const metaTitle = document.createElement('title');
metaTitle.textContent = 'Medical Info Card';
document.head.appendChild(metaTitle);

// Add Google Fonts and Material Icons
const googleFonts = document.createElement('link');
googleFonts.rel = 'stylesheet';
googleFonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
document.head.appendChild(googleFonts);

const materialIcons = document.createElement('link');
materialIcons.rel = 'stylesheet';
materialIcons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
document.head.appendChild(materialIcons);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
