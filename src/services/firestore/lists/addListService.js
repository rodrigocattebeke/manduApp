import { auth, db } from "@/lib/firebase";
import { collection, doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { uploadListImageService } from "./uploadListImageService";

export async function addListService(listData) {
  try {
    if (!listData.imgFile) {
      const listRef = doc(collection(db, "lists"));
      const localTimestamp = Timestamp.fromDate(new Date());
      const imgURL = "https://picsum.photos/200"; //Set default img url
      const listDataWithUID = { ...listData, id: listRef.id, userUID: auth.currentUser.uid, createdAt: localTimestamp, updatedAt: localTimestamp, imgURL };

      //delete imgFile property
      delete listDataWithUID.imgFile;

      await setDoc(listRef, { ...listDataWithUID, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      return { success: true, list: listDataWithUID };
    } else if (listData.imgFile) {
      const listRef = doc(collection(db, "lists"));
      const localTimestamp = Timestamp.fromDate(new Date());
      const listDataWithUID = { ...listData, id: listRef.id, userUID: auth.currentUser.uid, createdAt: localTimestamp, updatedAt: localTimestamp };
      //delete imgFile property
      delete listDataWithUID.imgFile;
      // Upload img and get imgURL
      const res = await uploadListImageService(listData.imgFile, listDataWithUID.id);

      if (res.success) {
        const imgURL = res.imgURL;
        listDataWithUID.imgURL = imgURL;
        await setDoc(listRef, { ...listDataWithUID, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        return { success: true, list: listDataWithUID };
      } else {
        return { success: false, error: res.error };
      }
    }
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}
