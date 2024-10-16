import { lazy } from "react";

import type { AppRoute } from "./types";
const Login = lazy(() => import("../screens/LogIn"));
class RoutesMap {
  // Private Routes

  // Set Main/Home route

  // Public Routes
  static LOGIN: AppRoute = {
    title: "Login",
    path: "login",
    subRoutes: {},
    Element: Login,
    kind: "public",
  };

  // Independent Routes
}

export default RoutesMap;
