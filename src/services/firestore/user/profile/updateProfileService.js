import { updateDisplayNameService } from "./updateDisplayNameService";
import { updateProfileImageService } from "./updateProfileImageService";
import { updateUserDataService } from "./updateUserDataService";

export const updateProfileService = async (userFormData, userData) => {
  const imgFile = userFormData.get("img");
  const displayName = userFormData.get("displayName");

  if (!imgFile && displayName == userData.displayName) return { success: true, message: "No hubo cambios para aplicar." };

  try {
    if (!imgFile) {
      const res = await updateDisplayNameService(displayName);
      if (res.success) {
        const newUserData = {
          displayName,
        };
        return { success: true, updatedUserData: newUserData };
      } else {
        return { success: false, error: res.error };
      }
    } else if (imgFile) {
      const profileRes = await updateProfileImageService(imgFile, userData.userUID);
      if (!profileRes.success) return { success: false, error: profileRes.error };

      const newUserData = {
        photoURL: profileRes.photoURL,
        displayName,
      };

      const userRes = await updateUserDataService(newUserData);

      if (!userRes.success) return { success: false, error: userRes.error };

      return { success: true, updatedUserData: newUserData };
    }
  } catch (error) {
    return { success: false, error };
  }
};
