import { AxiosInstance, AxiosResponse } from "axios";
import env from "../enviroment";
// console.log(env);
export const INSTANCE_CONFIG = {
  baseURL: env,
  headers: {
    "Content-Type": "application/json",
  },
};
function apiPromise(
  _instance: AxiosInstance,
  request: () => Promise<AxiosResponse>
) {
  return new Promise<any>((resolve) =>
    request()
      .then((response) => resolve(response))
      .catch((error) => error)
  );
}
export function setHeaders(
  instance: AxiosInstance,
  token: string,
  userId: string
) {
  instance.defaults.headers.common["x-access-token"] = token;
  instance.defaults.headers.common["x-access-user"] = userId;
}

export default apiPromise;
