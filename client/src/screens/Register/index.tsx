import { FC, useEffect, useState } from "react";
import countries from "./country.json";
import BasicInput from "../../components/BasicInput";
import { registerData } from "./registerData";
import { motion } from "framer-motion";
import { Some } from "../../helpers/Some";
import { User } from "../../services";
import { useApiCall } from "../../hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RoutesMap from "../../AppRoutes/RoutesMap";

interface RegisterProps {
  onSignInClick: () => void;
}
const country = Object.values(countries).map((item) => item.country);

const Register: FC<RegisterProps> = ({ onSignInClick }) => {
  const [registerState, setRegisterState] = useState(registerData);
  const [selectedCountry, setSelectedCountry] = useState<string>("India");
  const navigate = useNavigate();

  const register = useApiCall({
    fn: User.registerUser,
    onError: (d) => {
      toast.error(d?.data?.error || "Something went wrong");
    },
    onSuccess: (resp: any) => {
      navigate("/login-or-register" + RoutesMap.LOGIN.path);
      toast.success("Registration Successful");
    },
  });

  const handleRegister = () => {
    register.mutate({
      data: {
        user_name: registerState[0].value,
        email: registerState[1].value,
        phone: registerState[2].value,
        password: registerState[3].value,
        company: registerState[4].value,
        year_of_experience: registerState[5].value,
        about: registerState[6].value,
        country: selectedCountry,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Register
      </h2>
      <form autoComplete="off" className="grid grid-cols-2 gap-2">
        {registerState.map((state, idx) => {
          const isTouched = state.touched; // Check if the input was touched
          const helperText = isTouched && state?.validate
            ? state?.validate(state.value)
            : ""; // Show helper text only if the field has been touched

          return (
            <div key={state.label} className="mb-2">
              <BasicInput
                label={state.label}
                value={state.value}
                placeholder={state.placeHolder}
                required={state.required}
                id={state.label}
                type={state.type}
                helperText={helperText}
                onChange={(e) => {
                  setRegisterState((prev) => {
                    const updatedState = prev.map((data, index) =>
                      index !== idx ? data : { ...data, value: e.target.value }
                    );
                    return updatedState;
                  });
                }}
                onBlur={() =>
                  setRegisterState((prev) => {
                    const updatedData = prev.map((p, index) =>
                      index !== idx ? p : { ...p, touched: true }
                    );
                    return updatedData;
                  })
                }
              />
            </div>
          );
        })}
        <div className="flex flex-col">
          <label htmlFor="country" className="text-gray-800 dark:text-white">
            Country *
          </label>
          <select
            className="block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400 dark:text-white"
            id="country"
            name="country"
            style={{ height: "2.5rem" }}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {country.map((data, index) => (
              <option key={index} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="w-full flex items-center flex-col">
        <motion.button
          className="mt-8 w-24 text-white bg-blue-700 hover:bg-blue-800 rounded-sm h-10 disabled:cursor-not-allowed disabled:bg-slate-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={registerState.some(
            (rd) =>
              rd.validate
                ? Some.String(rd?.validate(rd.value))?.length > 0
                : false
          )}
          onClick={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          Register
        </motion.button>

        <p className="mt-4 flex justify-center w-full text-sm text-gray-600 dark:text-gray-300">
          Already have an account!{" "}
          <button
            className="text-indigo-600 hover:underline"
            onClick={onSignInClick}
          >
            &nbsp; Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
