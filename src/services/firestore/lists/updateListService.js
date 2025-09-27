import { db } from "@/lib/firebase";
import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { uploadListImageService } from "./uploadListImageService";

export async function updateListService(listID, newListData) {
  try {
    if (!newListData.imgFile) {
      //delete imgFile of newListData
      delete newListData.imgFile;

      const listRef = doc(db, "lists", listID);

      const localTimestamp = Timestamp.fromDate(new Date());

      const newDataWithLocaleUpdatedAt = { ...newListData, updatedAt: localTimestamp };

      await updateDoc(listRef, { ...newDataWithLocaleUpdatedAt, updatedAt: serverTimestamp() });

      return { success: true, list: newDataWithLocaleUpdatedAt };
    } else {
      // Upload img and get imgURL
      const res = await uploadListImageService(newListData.imgFile, listID);

      if (res.success) {
        //delete imgFile prop of newListData
        delete newListData.imgFile;

        // get imgURL and set to newListData
        const imgURL = res.imgURL;

        newListData.imgURL = imgURL;

        const listRef = doc(db, "lists", listID);

        const localTimestamp = Timestamp.fromDate(new Date());

        const newDataWithLocaleUpdatedAt = { ...newListData, updatedAt: localTimestamp };

        await updateDoc(listRef, { ...newDataWithLocaleUpdatedAt, updatedAt: serverTimestamp() });

        return { success: true, list: newDataWithLocaleUpdatedAt };
      } else {
        return { success: false, error: res.error };
      }
    }
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}
