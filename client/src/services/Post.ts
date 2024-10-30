import axios from "axios";
import apiPromise, { INSTANCE_CONFIG, setHeaders } from "../axiso/apiPromise";
let instance = axios.create(INSTANCE_CONFIG);
const baseUrl = `/api/posts`;

export default class Post {
  static getAllPost(values: any) {
    setHeaders(instance, values.token, values.id);
    return apiPromise(instance, () =>
      instance.get(baseUrl + `/get-all-posts`, {
        params: {
          limit: 5,
          offset: values.offset,
        },
      })
    );
  }
}
