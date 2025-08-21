import { auth, db } from "@/lib/firebase";
import { collection, doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";

export async function addListService(listData) {
  try {
    const listRef = doc(collection(db, "lists"));

    const localTimestamp = Timestamp.fromDate(new Date());

    const imgURL = "https://picsum.photos/200"; //Set default img url, change in the future with cloudinary api for save photos

    const listDataWithUID = { ...listData, id: listRef.id, userUID: auth.currentUser.uid, createdAt: localTimestamp, updatedAt: localTimestamp, imgURL };

    await setDoc(listRef, { ...listDataWithUID, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });

    return { success: true, list: listDataWithUID };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}
