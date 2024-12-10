import { lazy } from "react";

import type { AppRoute } from "./types";
const Profile = lazy(() => import("../screens/Profile"));
const Login = lazy(() => import("../screens/LogIn"));
const Home = lazy(() => import("../screens/Home"));
const Create = lazy(() => import("../screens/CreatePost"));
class RoutesMap {
  // Private Routes
;
  // Set Main/Home route
  static PRIVATE_HOME: AppRoute = {
    title: "home",
    path: "home",
    subRoutes: {},
    Element: Home,
    kind: "private",
  };
  static CREATE_POST: AppRoute = {
    title: "create",
    path: "create",
    subRoutes: {},
    Element: Create,
    kind: "private",
  };
  static PROFILE: AppRoute = {
    title: "profile",
    path: "profile",
    subRoutes: {
      
    },
    Element: Profile,
    kind: "private",
  }
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
