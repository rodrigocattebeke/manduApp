export const getInitialCrop = (imgWidth, imgHeight, aspectRatio) => {
  console.log(imgWidth);
  if (!imgWidth || !imgHeight) return console.error("Se debe de pasar el ancho y el alto de la imagen");
  const imgAspectRatio = imgWidth / imgHeight;

  if (imgAspectRatio > aspectRatio) {
    const cropWidth = imgHeight * aspectRatio;
    const cropHeight = imgHeight;
    return {
      x: (imgWidth - cropWidth) / 2,
      y: 0,
      width: cropWidth,
      height: cropHeight,
      unit: "px",
    };
  } else if (imgAspectRatio < aspectRatio) {
    const cropWidth = imgWidth;
    const cropHeight = imgWidth / aspectRatio;
    return {
      x: 0,
      y: (imgHeight - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight,
      unit: "px",
    };
  }

  //If the ImgAspectRatio is equal to aspectRatio, then decrease by 1.5

  const cropWidth = imgWidth / 1.5;
  const cropHeight = imgHeight / 1.5;
  return {
    x: (imgWidth - cropWidth) / 2,
    y: (imgHeight - cropHeight) / 2,
    width: cropWidth,
    height: cropHeight,
    unit: "px",
  };
};
