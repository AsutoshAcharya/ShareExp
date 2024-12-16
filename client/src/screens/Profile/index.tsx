import { User as UserService } from "../../services";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreds } from "../../hooks";
import { Some } from "../../helpers/Some";
import { useQuery } from "@tanstack/react-query";
import { Social, User } from "../../store/types";
import UserAvatar from "../../components/UserAvatar";
import uniqolor from "uniqolor";

const Profile = () => {
  const { user } = useCreds("id", "token");
  const location = useLocation();
  const userId = location.search.split("?")[1];
  const navigate = useNavigate();

  function toUser(user: any): Omit<User, "token"> {
    return {
      id: Some.String(user?._id),
      name: Some.String(user?.user_name),
      email: Some.String(user?.email),
      phone: Some.String(user?.phone),
      country: Some.String(user?.country),
      yearOfExperience: Some.String(user?.year_of_experience),
      company: Some.String(user?.company),
      skills: Some.Array(user?.skills).map((skill) => Some.String(skill)),
      profilePicture: Some.String(user?.profile_picture),
      about: Some.String(user?.about),
      socials: Some.Array(user?.socials).map(
        (item: any) =>
          ({
            type: Some.String(item?.type),
            link: Some.String(item?.link),
          } as Social)
      ),
    };
  }

  async function getUserDetails() {
    const resp = await UserService.getUserInfo({ ...user, id: userId });
    return Some.Object(resp?.data);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["get-user-info", userId],
    queryFn: getUserDetails,
    select: (data) => toUser(data),
    refetchOnWindowFocus: false,
  });
  const avatarBg = uniqolor(data?.name || "").color;
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary hover:scale-105 transition-transform"
        >
          Back
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 animate-fade-in">
          User Profile
        </h1>
      </div>

      <div className="card shadow-lg bg-white rounded-lg hover:shadow-2xl transition-shadow">
        <div className="card-body">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <progress className="progress progress-primary w-56 animate-pulse"></progress>
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-6 mb-6">
                <UserAvatar
                  imageUrl={data?.profilePicture}
                  name={data?.name || ""}
                  style={{ backgroundColor: avatarBg }}
                  size={80}
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {data?.name}
                  </h2>
                  <p className="text-gray-600 text-lg">{data?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Phone
                  </label>
                  <p className="text-gray-800 text-lg bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                    {data?.phone}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Country
                  </label>
                  <p className="text-gray-800 text-lg bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                    {data?.country}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-1">
                  About
                </label>
                <p className="text-gray-800 text-lg bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                  {data?.about}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
