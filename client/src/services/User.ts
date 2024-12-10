import axios from "axios";
import apiPromise, { INSTANCE_CONFIG, setHeaders } from "../axiso/apiPromise";
const instance = axios.create(INSTANCE_CONFIG);
const baseUrl = `/api/users`;

export default class User {
  static loginUser(values: any) {
    // setHeaders(instance,values.token,values.id); //pass this authentication apis
    return apiPromise(instance, () =>
      instance.post(baseUrl + "/login", values.data)
    );
  }
  static registerUser(values: any) {
    return apiPromise(instance, () =>
      instance.post(baseUrl + "/signup", values.data)
    );
  }
  static getUserInfo(values: any) {
    setHeaders(instance, values.token, values.id);
    return apiPromise(instance, () =>
      instance.get(baseUrl + `/get-user-info/${values.id}`));
  }
}
