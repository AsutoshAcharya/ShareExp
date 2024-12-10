import { useState } from "react";
import { User as UserService } from "../../services";

import { useLocation, useNavigate } from "react-router-dom";
import { useCreds } from "../../hooks";
import { Some } from "../../helpers/Some";
import { useQuery } from "@tanstack/react-query";

import { Social, User } from "../../store/types";



const Profile = () => {
  const { user } = useCreds("id", "token");
  const [profileState, setProfileState] = useState([]);
  const [edit, setEdit] = useState<boolean>(false);
  const id = useLocation();
  const userId = id.search.split("?");
function toUser(user:any): Omit<User,"token"> {   return {
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
    const resp = await UserService.getUserInfo({ ...user });
    console.log(resp);
    return Some.Object(resp?.data);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["get-user-info", userId],
    queryFn: getUserDetails,
    select: (data) => toUser(data),
    refetchOnWindowFocus: false,
  });
  console.log(data);

  const history = useNavigate();
  return (
    <div className="h-[100vh] w-100% p-6 bg-gray-100">
      <div className="w-100% flex justify-between">
        <div>
          <button
            onClick={() => history(-1)}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            back
          </button>
        </div>
        <div>
          {edit ? (
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              cancel
            </button>
          ) : (
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              edit profile
            </button>
          )}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            save changes
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
