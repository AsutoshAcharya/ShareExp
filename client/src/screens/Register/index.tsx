import React, { useState } from "react";
import countries from "./country.json";
import BasicInput from "../../components/BasicInput";
import { registerData } from "./registerData";
const Register = () => {
  const country = Object.values(countries).map((item) => item.country);

  console.log(country);

  const [registerState, setRegister] = useState(registerData);
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Register
      </h2>
      <form className="grid grid-cols-2 gap-2">
        {registerState.map((state, index) => {
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
            className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400 dark:text-white"
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
    </div>
  );
};

export default Register;
