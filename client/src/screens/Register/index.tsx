import { FC, useState } from "react";
import countries from "./country.json";
import BasicInput from "../../components/BasicInput";
import { registerData } from "./registerData";
import { motion } from "framer-motion";

interface RegisterProps {
  onSignInClick: () => void;
}

const Register: FC<RegisterProps> = ({ onSignInClick }) => {
  const country = Object.values(countries).map((item) => item.country);

  const [registerState, setRegisterState] = useState(registerData);

  return (
    <motion.div
      initial={{ opacity: 0 }} // Start hidden
      animate={{ opacity: 0.8 }} // Fade in
      transition={{ duration: 1.2, ease: "easeInOut" }} // Transition time
    >
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Register
      </h2>
      <form className="grid grid-cols-2 gap-2">
        {registerState.map((state) => {
          return (
            <div key={state.label} className="mb-2">
              <BasicInput
                label={state.label}
                placeholder={state.placeHolder}
                required
                id={state.label}
                type={state.type}
              />
            </div>
          );
        })}
        <div className="flex flex-col">
          <label htmlFor="country" className="text-gray-800 dark:text-white">
            Country
          </label>
          <select
            className=" block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400 dark:text-white"
            id="country"
            name="country"
            style={{ height: "2.5rem" }}
          >
            {country.map((data, index) => {
              return (
                <option key={index} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="skills" className="text-gray-800 dark:text-white">
            Skills
          </label>
          <select
            className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400 dark:text-white"
            id="skills"
            name="skills"
            style={{ height: "2.5rem" }}
          >
            TBD
          </select>
        </div>
      </form>

      <div className="w-full flex items-center flex-col">
        <motion.button
          className="mt-8 w-24 text-white bg-blue-700 hover:bg-blue-800 rounded-sm h-10"
          whileHover={{ scale: 1.1 }} // Hover animation
          whileTap={{ scale: 0.9 }} // Tap animation
        >
          Register
        </motion.button>

        <p className="mt-4 flex justify-center w-full text-sm text-gray-600 dark:text-gray-300">
          Already have an account!{" "}
          <button
            className="text-indigo-600 hover:underline"
            onClick={onSignInClick}
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
