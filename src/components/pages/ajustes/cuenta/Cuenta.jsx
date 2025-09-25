"use client";

import { Header } from "@/components/ui/header/Header";
import Image from "next/image";
import styles from "./Cuenta.module.css";
import { useContext, useRef, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal/Modal";
import { useRouter } from "next/navigation";
import { useParentPath } from "@/hooks/useParentPath";

export const Cuenta = () => {
  const { userData, userFunctions } = useContext(UserContext);
  const [displayName, setDisplayName] = useState(userData.displayName);
  const [inputFileImg, setInputFileImg] = useState(undefined);
  const [imgURL, setImgURL] = useState(userData.photoURL || undefined);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showSaveDataModal, setShowSaveDataModal] = useState(false);
  const uploadFileRef = useRef();
  const parentPath = useParentPath();
  const router = useRouter();

  const handleInput = (e) => {
    setDisplayName(e.target.value);
  };

  const handleUploadImgButton = () => {
    uploadFileRef.current?.click();
  };

  const handleUpFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate the img type
    const validTypes = ["image/jpeg", "image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Solo se permiten imágenes JPG, , JPEG, PNG o WEBP.");
      return;
    }

    setInputFileImg(e.target.files[0]);
    //previsualize the img
    const image = URL.createObjectURL(file);
    setImgURL(image);
  };

  // Save data button functions
  const onSaveDataModalClose = () => {
    setShowSaveDataModal(false);
  };

  const handleSaveDataButton = () => {
    setShowSaveDataModal(true);
  };

  const onConfirmSaveData = async () => {
    const userFormData = new FormData();
    userFormData.append("img", inputFileImg);
    userFormData.append("displayName", displayName);
    const res = await userFunctions.updateAccountInformation(userFormData);

    if (!res.success) alert("Ocurrio un error al actualizar, intenta de nuevo más tarde");
    setShowSaveDataModal(false);
    return;
  };

  // Cancel button functions

  const handleCancelButton = () => {
    setShowCancelModal(true);
  };

  const onConfirmCancelModal = () => {
    router.push(parentPath);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
  };

  // Delete account button functions
  const onDeleteAccountModalClose = () => {
    setShowDeleteAccountModal(false);
  };

  const handleDeleteAccountButton = () => {
    setShowDeleteAccountModal(true);
  };

  const onConfirmDeleteAccount = () => {
    console.log("Cuenta eliminada");
    const timeout = setTimeout(() => {
      setShowDeleteAccountModal(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  return (
    <>
      <Header title="Cuenta" />
      <section className="container-xxl d-flex flex-column flex-md-row">
        <div className={`${styles.profileImage} col-md-6`}>
          <div className={styles.imageContainer}>
            <Image src={imgURL} width={128} height={128} alt={`Foto de perfil de ${userData.displayName}`} />
          </div>
          <div className={styles.infoContainer}>
            <h2>{userData.displayName}</h2>
            <p>Te uniste en 2025</p>
          </div>
          <div className={styles.changeImageButton}>
            <input type="file" className={styles.profileInput} ref={uploadFileRef} accept=".jpg, .jpeg, .png, .webp" onChange={(e) => handleUpFileChange(e)}></input>
            <Button text="Cambiar foto de perfil" onClick={handleUploadImgButton} />
          </div>
        </div>
        <div className={`${styles.displayName} col-md-6`}>
          <p>Nombre</p>
          <input name="name" className={styles.nameInput} value={displayName} onChange={handleInput} />
        </div>
      </section>
      <section className={`container-xxl ${styles.actionButtons}`}>
        <div className={`${styles.editButtons} flex-md-row`}>
          <Button text="Guardar" mode="primary" fullWidth="true" onClick={handleSaveDataButton} />
          <Button text="Cancelar" fullWidth="true" onClick={handleCancelButton} />
        </div>
        <Button text="Eliminar cuenta" mode="danger" fullWidth="true" onClick={handleDeleteAccountButton} />
      </section>

      {/*    MODALS    */}

      {/* Save data modal*/}
      <Modal title="¿Estás seguro de guardar los cambios?" show={showSaveDataModal} onClose={onSaveDataModalClose} onConfirm={onConfirmSaveData} onCancel={onSaveDataModalClose} />

      {/* Cancel modal */}
      <Modal title="¿Estás seguro de cancelar?" show={showCancelModal} onClose={closeCancelModal} onConfirm={onConfirmCancelModal} onCancel={closeCancelModal} />

      {/* Delete account modal */}
      <Modal title="¿Estás seguro de eliminar tu cuenta?" description="Esta acción no se puede revertir" mode="danger" show={showDeleteAccountModal} onClose={onDeleteAccountModalClose} onConfirm={onConfirmDeleteAccount} onCancel={onDeleteAccountModalClose} />
    </>
  );
};
