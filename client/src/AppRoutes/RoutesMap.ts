import { lazy } from "react";

import type { AppRoute } from "./types";
const Profile = lazy(() => import("../screens/Profile"));
const Login = lazy(() => import("../screens/LogIn"));
const Home = lazy(() => import("../screens/Home"));

class RoutesMap {
  // Private Routes
  static PROFILE: AppRoute = {
    title: "profile",
    path: "profile/:id",
    subRoutes: {},
    Element: Profile,
    kind: "private",
  };
  // Set Main/Home route
  static PRIVATE_HOME: AppRoute = {
    title: "home",
    path: "home",
    subRoutes: {},
    Element: Home,
    kind: "private",
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
