import ReactCrop from "react-image-crop";
import { useEffect, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import styles from "./ImageCropper.module.css";
import { Button } from "../ui/button/Button";
import { Modal } from "../ui/modal/Modal";
import { getCroppedImageFromFile } from "@/lib/cropper/getCroppedImgFromFile";
import { Loader } from "../loader/Loader";
import { getInitialCrop } from "@/lib/cropper/getInitialCrop";

export const ImageCropper = ({ imgFile, aspect = 1, circularCrop = false, onCropConfirm, onCropCancel }) => {
  if (!imgFile) return console.error("Se debe de pasar el file de la imagen.");
  if (!onCropConfirm || !onCropCancel) return console.error("Se debe de pasar onCropConfirm y onCropCancel para manejar el recorte.");

  const imgRef = useRef();
  const [imgURL, setImgURL] = useState(undefined);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    unit: "%",
  });

  //Generate initial centered crop
  const handleImageLoad = () => {
    const width = imgRef.current.clientWidth;
    const height = imgRef.current.clientHeight;
    const initialCrop = getInitialCrop(width, height, aspect);
    setCrop(initialCrop);
  };

  //Generate imgURL from preview
  useEffect(() => {
    const getImgUrl = async () => {
      const imgUrl = URL.createObjectURL(imgFile);
      setImgURL(imgUrl);
      setIsImgLoading(false);
    };
    getImgUrl();
  }, [imgFile]);

  // modal functions
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onModalConfirm = async () => {
    const img = imgRef.current;
    const visibleSize = {
      width: img.clientWidth,
      height: img.clientHeight,
    };

    const croppedImg = await getCroppedImageFromFile(imgFile, crop, visibleSize);
    onCropConfirm(croppedImg);
    setIsModalVisible(false);
  };

  return isImgLoading ? (
    <Loader fullScreen="true" backdrop="true" />
  ) : (
    <>
      <div className={styles.cropperContainer}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <p className={styles.title}>Recortar imágen</p>
            <p className={styles.description}>Ajusta la selección para recortar tu imágen. </p>
          </div>
          <ReactCrop className={styles.reactCrop} crop={crop} onChange={(c) => setCrop(c)} aspect={aspect} keepSelection={true} circularCrop={circularCrop}>
            <img src={imgURL} alt="Imagen para recortar" ref={imgRef} onLoad={handleImageLoad} />
          </ReactCrop>
          <div className={styles.buttonsContainer}>
            <Button mode="default" text="Cancelar" onClick={onCropCancel} />
            <Button mode="primary" text="Confirmar" onClick={() => setIsModalVisible(true)} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal title="Confirmar recorte" onConfirm={onModalConfirm} onCancel={closeModal} onClose={closeModal} show={isModalVisible} />
    </>
  );
};
