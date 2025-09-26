export const uploadListImageService = async (imgFile, listID) => {
  if (!imgFile || !listID) return { success: false, error: "Se necesita el File y el listID" };
  try {
    //create the form data
    const formData = new FormData();

    // Create new File with custom name
    const newImgFile = new File([imgFile], `listImage_${listID}`, { type: imgFile.type });

    formData.append("img", newImgFile);

    // //fetch
    const res = await fetch("/api/images/lists", {
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
