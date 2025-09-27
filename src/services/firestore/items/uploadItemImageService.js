export const uploadItemImageService = async (imgFile, itemId) => {
  if (!imgFile || !itemId) return { success: false, error: "Se necesita el File y el itemId" };
  try {
    //create the form data
    const formData = new FormData();

    // Create new File with custom name
    const newImgFile = new File([imgFile], `itemImage_${itemId}`, { type: imgFile.type });

    formData.append("img", newImgFile);

    // //fetch
    const res = await fetch("/api/images/items", {
      method: "POST",
      body: formData,
    });

    const cloudRes = await res.json();

    if (cloudRes.success) {
      const imgURL = cloudRes.imgURL;
      return { success: true, imgURL };
    } else {
      return { success: false, error: cloudRes.error };
    }
  } catch (error) {
    return { success: false, error };
  }
};
