import express, { type Request, Response, NextFunction } from "express";
import { ViteDevServer } from "vite";
import { createServer } from "http";
import { log } from "./vite";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import path from "path";
import fs from "fs";

async function createApp() {
  const isDev = process.env.NODE_ENV === "development";
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        log(logLine);
      }
    });

    next();
  });

  // Serve static files from the data directory
  const dataDir = path.join(import.meta.dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Create a virtual files directory for medical files
  app.get('/api/files/:filename', (req, res) => {
    const { filename } = req.params;
    // Just return a success response since these are virtual files for demo purposes
    res.status(200).send(`This would be the contents of file: ${filename}`);
  });


  const httpServer = await registerRoutes(app);
  
  if (isDev) {
    await setupVite(app, httpServer);
  } else {
    serveStatic(app);
  }

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error(err);
  });

  return httpServer;
}

async function main() {
  try {
    const httpServer = await createApp();
    const port = process.env.PORT || 5000;

    httpServer.listen(
      Number(port),
      "127.0.0.1",
      () => {
        log(`serving on port ${port}`);
      }
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();