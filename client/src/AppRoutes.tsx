import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { BlurryLoader } from "./components";
import appRoutes from "./AppRoutes/appRoutes";
import { groupBy } from "./helpers";
import GetRoute from "./AppRoutes/GetRoute";

const allRoutes = groupBy(appRoutes, "kind");
const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<BlurryLoader />}>
        <Routes>
          {/* {allRoutes["private"].map(GetRoute)} */}
          {allRoutes["public"].map(GetRoute)}
          {/* {allRoutes["independent"].map(GetRoute)} */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
