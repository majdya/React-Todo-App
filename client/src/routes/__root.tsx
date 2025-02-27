import { StrictMode } from "react";

import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <StrictMode>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/account" className="[&.active]:font-bold">
            Account
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </StrictMode>
    </>
  ),
});
