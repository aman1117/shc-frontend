import { api } from "@/lib/api";
import { User } from "@/types/user.type";

export async function getMe() {
  // The 60 is the cache time in seconds
  // TODO: try to optimize this to use in middleware and dashboard page or is it ok?
  // maybe we need separate api for this
  return (await api.get("api/users/me", undefined, 60)) as User;
}
