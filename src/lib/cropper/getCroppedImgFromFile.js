export async function getCroppedImageFromFile(file, crop, visibleSize) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const scaleX = img.naturalWidth / visibleSize.width;
      const scaleY = img.naturalHeight / visibleSize.height;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const x = crop.x * scaleX;
      const y = crop.y * scaleY;
      const width = crop.width * scaleX;
      const height = crop.height * scaleY;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Error al generar recorte"));
        const croppedFile = new File([blob], file.name, { type: file.type });
        const croppedUrl = URL.createObjectURL(blob);
        resolve({ file: croppedFile, url: croppedUrl });
      }, file.type);
    };

    img.onerror = (err) => reject(err);
  });
}
