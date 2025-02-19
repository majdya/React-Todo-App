import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "./routeTree.gen";

import {
  NotFoundRoute,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";

import { Route as rootRoute } from "./routes/__root.tsx";

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => "404 Not Found X!",
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  notFoundRoute,
  defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(<RouterProvider router={router} />);
}
