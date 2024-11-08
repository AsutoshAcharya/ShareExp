import { useState } from "react";

const Profile = () => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <div className="h-[100vh] w-100% p-6 bg-gray-100">
      <div className="w-100% flex justify-between">
        <div>
          <button
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
      <div className="mt-2 w-100% border-2 h-4/5 p-6 flex">
        <div className="w-1/2">
          <img
            src="../../../public/vite.svg"
            alt="profile pic"
            className="rounded-full border-2"
          />
        </div>
        <div className="w-1/2">
          jjgh
        </div>
      </div>
    </div>
  );
};
export default Profile;
