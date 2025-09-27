import { db } from "@/lib/firebase";
import { doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { uploadItemImageService } from "./uploadItemImageService";

export const updateItemService = async (itemId, newItemData) => {
  try {
    //Initialize itemRef
    const itemRef = doc(db, "items", itemId);
    const localTimestamp = Timestamp.fromDate(new Date());

    if (!newItemData.imgFile) {
      //Delete imgFile
      delete newItemData.imgFile;

      const newDataWithLocaleUpdatedAt = { ...newItemData, updatedAt: localTimestamp };

      await updateDoc(itemRef, { ...newDataWithLocaleUpdatedAt, updatedAt: serverTimestamp() });

      return { success: true, item: newDataWithLocaleUpdatedAt };
    } else {
      const imgFile = newItemData.imgFile;
      // Get new imgURL
      const res = await uploadItemImageService(imgFile, itemId);

      if (res.success) {
        //Delete imgFile
        delete newItemData.imgFile;

        //Set the new imgURL
        const imgURL = res.imgURL;

        const newDataWithLocaleUpdatedAt = { ...newItemData, imgURL, updatedAt: localTimestamp };

        await updateDoc(itemRef, { ...newDataWithLocaleUpdatedAt, updatedAt: serverTimestamp() });

        return { success: true, item: newDataWithLocaleUpdatedAt };
      } else {
        return { success: false, error: res.error };
      }
    }
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
};
