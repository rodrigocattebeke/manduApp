import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./index";

export async function singInWithGoogle() {
  try {
    const res = await signInWithPopup(auth, provider);
    return res.user;
  } catch (error) {
    console.log(error);
    return error;
  }
}
