import { lazy } from "react";

import type { AppRoute } from "./types";
const Login = lazy(() => import("../screens/LogIn"));
const Home = lazy(() => import("../screens/Home"));

class RoutesMap {
  // Private Routes

  // Set Main/Home route
  static HOME: AppRoute = {
    title: "home",
    path: "/",
    subRoutes: {},
    Element: Home,
    kind: "public",
  };
  // Public Routes
  static LOGIN: AppRoute = {
    title: "Login",
    path: "login-or-register",
    subRoutes: {},
    Element: Login,
    kind: "public",
  };

  // Independent Routes
}

export default RoutesMap;
