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
  static likePost(values: any) {
    setHeaders(instance, values.token, values.id);
    return apiPromise(instance, () =>
      instance.post(baseUrl + `/like-post`, values.data)
    );
    //   {
    //     "user_id":"670fe49125871392de714531",
    //     "post_id":"67225a06d0bfc8ebd068a9fc"
    // }
  }

  static dislikePost(values: any) {
    setHeaders(instance, values.token, values.id);
    return apiPromise(instance, () =>
      instance.post(baseUrl + `/remove-like`, values.data)
    );
    //   {
    //     "user_id":"670fe49125871392de714531",
    //     "post_id":"67225a06d0bfc8ebd068a9fc"
    // }
  }
}
