import { Fragment } from "react";
const Login = () => {
  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-[url('./Assets/LoginImage.jpg')] bg-cover bg-center p-4 relative">  
      {/* will change the image later */}
        <div className="bg-white dark:bg-gray-800 shadow-lg w-full max-w-md p-8 absolute right-0 h-[100vh] opacity-85">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Login</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Welcome to the Interview Experience website. Share and read experiences related to interviews in various fields.
            </p>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                I agree to the terms of service
              </label>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Register
              </a>
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot your password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
