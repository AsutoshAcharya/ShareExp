import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useCreds from "../hooks/useUser";
import UserAvatar from "./UserAvatar";
import RoutesMap from "../AppRoutes/RoutesMap";
import { useAuthStore } from "../store/authStore";

const NavBar = () => {
  const { user } = useCreds("token", "id", "profilePicture", "name");
  const navigate = useNavigate();
const {logOut}=useAuthStore();

  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center justify-between sticky top-0 z-50 px-6 transition duration-300 ease-in-out">
      <p className="font-extrabold text-2xl text-gray-800 hover:text-gray-600 cursor-pointer">
        Share Exp
      </p>
      <div className="flex items-center space-x-4">
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
                className="dropdown-content menu bg-white rounded-lg shadow-lg p-4 z-10 transition-opacity duration-200 ease-in-out w-60"
              >
                <button className="btn btn-ghost text-gray-800 hover:bg-gray-200 w-full text-left flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </button>
                <button className="btn btn-ghost text-gray-800 hover:bg-gray-200 w-full text-left flex items-center space-x-2" onClick={()=>{
                   logOut();
                   navigate("/"+RoutesMap.LOGIN.path)
                }}>
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
