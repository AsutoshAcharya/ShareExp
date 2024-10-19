import { Fragment, useState } from "react";
//other imports
import { motion } from "framer-motion"; // Import framer-motion

//local imports
import BasicInput from "../../components/BasicInput";
import Register from "../Register";
import { emptyLoginData } from "./emptyLoginData";

const Login = () => {
  const [loginState, setLoginState] = useState(emptyLoginData);
  const [register, setRegister] = useState<boolean>(false);

  function handleLogin() {}

  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-[url('./Assets/LoginImage.jpg')] bg-cover bg-center p-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 900 }} // Start off-screen
          animate={{ opacity: 0.8, x: 0 }} // Animate into place
          transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth transition
          className={`bg-white dark:bg-gray-800 shadow-lg p-8 absolute right-0 h-[100vh] opacity-85 transition-all duration-300 ${
            register ? "w-2/3" : "w-1/3"
          }`}
        >
          {register ? (
            <motion.div
              key="register" // Key for smooth transition between views
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Register onSignInClick={() => setRegister(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="login" // Key for smooth transition between views
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-semibold text-gray-800 dark:text-white"
                >
                  Login
                </motion.h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Welcome to the Interview Experience website. Share and read
                  experiences related to interviews in various fields.
                </p>
              </div>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                {loginState.map((state, idx) => (
                  <BasicInput
                    key={state.label}
                    label={state.label}
                    placeholder={state.placeHolder}
                    required
                    id={state.label}
                    type={state.label}
                    value={state.value}
                    onChange={(e) =>
                      setLoginState((prev) => {
                        const updatedData = prev.map((p, index) =>
                          index !== idx ? p : { ...p, value: e.target.value }
                        );
                        return updatedData;
                      })
                    }
                  />
                ))}

                <motion.button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  whileHover={{ scale: 1.05 }} // Scale up slightly on hover
                  whileTap={{ scale: 0.95 }} // Scale down slightly on click
                  transition={{ duration: 0.2 }}
                >
                  Login
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Don't have an account?{" "}
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() => setRegister(true)}
                  >
                    Register
                  </button>
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <a href="#" className="text-indigo-600 hover:underline">
                    Forgot your password?
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Fragment>
  );
};

export default Login;
