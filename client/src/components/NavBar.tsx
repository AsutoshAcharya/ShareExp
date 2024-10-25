import { useNavigate } from "react-router-dom";
import useCreds from "../hooks/useUser";
import UserAvatar from "./UserAvatar";
import RoutesMap from "../AppRoutes/RoutesMap";

const NavBar = () => {
  const { user } = useCreds("token", "id", "profilePicture", "name");
  const navigate = useNavigate();
  return (
    <div className="w-dvw h-14 bg-white shadow-md flex flex-row items-center justify-between sticky top-0">
      <p className="font-extrabold text-4xl text-gray-600">Share Exp</p>
      <div className="flex justify-center items-center">
        {user.token && user.id ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="p-2">
              <UserAvatar
                size={40}
                imageUrl={user.profilePicture}
                name={user.name}
              />
            </div>
            <div
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow gap-2 mr-5"
            >
              <button className="btn">Profile</button>
              <button className="btn">LogOut</button>
            </div>
          </div>
        ) : (
          <button
            className="btn p-4 mr-2"
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
