import { User } from "../store/types";
import { useAuthStore } from "../store/authStore";
import { pick } from "../helpers";

function useCreds<K extends keyof User>(
  ...keys: Array<K>
): {
  user: Pick<User, K>;
} {
  const { user: allCreds } = useAuthStore();
  let user: Pick<User, K> = allCreds;
  if (keys.length !== 0) {
    user = pick(allCreds, ...keys);
  }
  return { user };
}

export default useCreds;
