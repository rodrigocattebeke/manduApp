import { auth, db } from "@/lib/firebase";
import { collection, doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { uploadItemImageService } from "./uploadItemImageService";

export const addItemService = async (listId, itemData) => {
  try {
    // Initialize itemRef
    const itemRef = doc(collection(db, "items"));
    const localTimestamp = Timestamp.fromDate(new Date());

    if (!itemData.imgFile) {
      //Set default img url
      const imgURL = "https://picsum.photos/200";

      // Delete imgFile prop
      delete itemData.imgFile;

      const dataWithUID = { ...itemData, id: itemRef.id, listId, userUID: auth.currentUser.uid, createdAt: localTimestamp, updatedAt: localTimestamp, imgURL };

      await setDoc(itemRef, { ...dataWithUID, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });

      return { success: true, item: dataWithUID };
    } else {
      const itemId = itemRef.id;
      const imgFile = itemData.imgFile;

      const res = await uploadItemImageService(imgFile, itemId);

      if (res.success) {
        // Delete imgFile prop
        delete itemData.imgFile;

        // Get imgURL
        const imgURL = res.imgURL;

        const dataWithUID = { ...itemData, id: itemRef.id, listId, userUID: auth.currentUser.uid, createdAt: localTimestamp, updatedAt: localTimestamp, imgURL };

        await setDoc(itemRef, { ...dataWithUID, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });

        return { success: true, item: dataWithUID };
      } else {
        return { success: false, error: res.error };
      }
    }
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
};
