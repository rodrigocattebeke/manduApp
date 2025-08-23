import { auth, db } from "@/lib/firebase";
import { collection, doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";

export const addItemService = async (listId, itemData) => {
  try {
    const itemRef = doc(collection(db, "items"));

    const localTimestamp = Timestamp.fromDate(new Date());

    const imgURL = "https://picsum.photos/200"; //Set default img url, change in the future with cloudinary api for save photos

    const dataWithUID = { ...itemData, id: itemRef.id, listId, userUID: auth.currentUser.uid, createdAt: localTimestamp, updatedAt: localTimestamp, imgURL };

    await setDoc(itemRef, { ...dataWithUID, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });

    return { success: true, item: dataWithUID };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
};
