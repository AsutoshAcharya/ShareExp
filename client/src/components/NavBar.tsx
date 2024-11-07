import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useCreds from "../hooks/useCreds";
import UserAvatar from "./UserAvatar";
import RoutesMap from "../AppRoutes/RoutesMap";
import { useAuthStore } from "../store/authStore";
import SelectTheme from "./SelectTheme";

const NavBar = () => {
  const { user } = useCreds("token", "id", "profilePicture", "name");
  const navigate = useNavigate();
  const { logOut } = useAuthStore();

  return (
    <div className="w-full h-[10%] bg-white shadow-md flex items-center justify-between sticky top-0 z-50 px-6 transition duration-300 ease-in-out">
      <div className="flex gap-3">
        <p className="font-extrabold text-2xl text-gray-800 hover:text-gray-600 cursor-pointer">
          Share Exp
        </p>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="h-2" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="flex items-center space-x-4">
        <SelectTheme />
        {user.token && user.id ? (
          <div className="relative">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="p-2 cursor-pointer transition-transform transform hover:scale-110"
              >
                <UserAvatar
                  size={40}
                  imageUrl={user.profilePicture}
                  name={user.name}
                />
              </div>
              <div
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-lg shadow-lg p-4 z-10 transition-opacity duration-200 ease-in-out w-60 gap-4"
              >
                <button className="btn btn-primary hover:bg-gray-200 w-full text-left flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </button>
                <button
                  className="btn btn-primary hover:bg-gray-200 w-full text-left flex items-center space-x-2"
                  onClick={() => {
                    logOut();
                    navigate("/" + RoutesMap.LOGIN.path);
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>LogOut</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-primary p-2 rounded-lg transition duration-200 ease-in-out hover:bg-blue-600"
            onClick={() => navigate("/" + RoutesMap.LOGIN.path)}
          >
            LogIn / Register
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
