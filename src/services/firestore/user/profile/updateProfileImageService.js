export const updateProfileImageService = async (imgFile, userUID) => {
  try {
    //create the form data
    const formData = new FormData();

    // Create new File with custom name
    const newImgFile = new File([imgFile], `userProfile_${userUID}`, { type: imgFile.type });

    formData.append("img", newImgFile);

    // //fetch
    const res = await fetch("/api/images/users", {
      method: "POST",
      body: formData,
    });

    const cloudRes = await res.json();

    if (cloudRes.success) {
      const photoURL = cloudRes.photoURL;
      return { success: true, photoURL };
    } else {
      return { success: false, error: cloudRes.error };
    }
  } catch (error) {
    return { success: false, error };
  }
};
