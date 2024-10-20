import { Fragment, Suspense } from "react";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const allRoutes = groupBy(appRoutes, "kind");
const AppRoutes = () => {
  return (
    <Fragment>
      <ToastContainer
        pauseOnFocusLoss={false}
        position="bottom-left"
        pauseOnHover={false}
        style={{
          width: "fit-content",
          fontSize: "13px",
        }}
      />

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
    </Fragment>
  );
};

export default AppRoutes;
