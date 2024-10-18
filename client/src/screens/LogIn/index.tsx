import { Fragment, useState } from "react";
import BasicInput from "../../components/BasicInput";
import Register from "../Register";
const emptyLoginData: Array<{
  label: string;
  value: string;
  error: boolean;
  placeHolder: string;
}> = [
  {
    label: "email",
    value: "",
    error: false,
    placeHolder: "you@example.com",
  },
  {
    label: "password",
    value: "",
    error: false,
    placeHolder: "••••••••",
  },
];

const Login = () => {
  const [loginState, setLoginState] = useState(emptyLoginData);
  const [register, setRegister] = useState<boolean>(false);
  function handleLogin() {}
  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-[url('./Assets/LoginImage.jpg')] bg-cover bg-center p-4 relative">
        {/* will change the image later */}
        <div
          className={`bg-white dark:bg-gray-800 shadow-lg p-8 absolute right-0 h-[100vh] opacity-85 transition-all duration-300 ${
            register ? "w-2/3" : "w-1/3"
          }`}
        >
          {register ? (
            <>
            <Register setRegister={setRegister}/>
            </>
          ) : (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                  Login
                </h2>
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
                  <a
                    href="#"
                    className="text-indigo-600 hover:underline"
                    onClick={() => setRegister(true)}
                  >
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
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
