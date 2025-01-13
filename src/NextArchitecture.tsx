declare var self: ServiceWorkerGlobalScope;

import { ExpressWorker } from "@express-worker/app";
import use404Handler from "./404Handler";
import useAppRouter from "./AppRouter";
import { install } from "./install";
import useMiddleware from "./Middleware";
import useStaticFiles from "./StaticFiles";

export function useNextArchitecture({
  staticFiles,
  routes,
  PageShell,
}: {
  PageShell: React.ComponentType<any>;
  staticFiles: string[];
  routes: Record<
    string,
    {
      Component: React.ComponentType<any>;
      getStaticProps: (
        params: Record<string, string>
      ) => Promise<Record<string, any>>;
      metadata: {
        title: string;
        description?: string;
      };
    }
  >;
}) {
  // Populates the cache on install.
  self.addEventListener(
    "install",
    install({
      staticFiles,
    })
  );

  // Immediately takes control of the page on activation.
  self.addEventListener("activate", () => {
    self.clients.claim();
  });

  const app = new ExpressWorker();

  // Apply `.data` and `.query` to the request object.
  useMiddleware(app);

  // Serve HTML pages via the App Router.
  useAppRouter(app, { PageShell, routes });

  // Serve static files.
  useStaticFiles(app, { staticFiles });

  // Catch-all 404 handler.
  use404Handler(app, { PageShell, Component: routes["/404"]?.Component });

  return app;
}
