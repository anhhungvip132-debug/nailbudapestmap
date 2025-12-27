import { auth } from "./firebaseClient";
import { getIdTokenResult } from "firebase/auth";

export async function checkIsAdmin() {
  const user = auth.currentUser;
  if (!user) return false;

  const token = await getIdTokenResult(user);
  return token.claims?.admin === true;
}
