"use client";
import { useEffect, useRef, useState } from "react";
import { Header } from "../ui/header/Header";
import styles from "./FormList.module.css";
import { STATUS, STATUS_LABELS, STATUS_ORDER } from "@/constants/statuses";
import Image from "next/image";
import { Button } from "../ui/button/Button";
import { ErrorTooltip } from "../ui/errorTooltip/ErrorTooltip";
import { useRouter } from "next/navigation";

/**
 * @param {{
 * showSelectStatus?: boolean,
 * initialValuesObjec?: {
 *  imgURL: string,
 * title: string,
 * description: string,
 * status: string
 * },
 * onSubmit: function({imgURL:string, title:string, description:string, status:string}): void
 * }} params
 *@returns
 */

const DEFAULT_VALUES = {
  imgURL: "",
  title: "",
  description: "",
  status: "",
};

export const FormList = ({ showSelectStatus = false, initialValuesObject, onSubmit }) => {
  const initialValues = {
    ...DEFAULT_VALUES,
    ...initialValuesObject,
  };

  const [imgURL, setImgURL] = useState(initialValues.imgURL);
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [status, setStatus] = useState(initialValues.status);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showStatusError, setShowStatusError] = useState(false);
  const router = useRouter();
  const uploadFileRef = useRef();

  //Validate onSubmit function
  if (!onSubmit || typeof onSubmit !== "function") return console.error("Se espera una funcion onSubmit");

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

    //previsualize the img
    const image = URL.createObjectURL(file);
    setImgURL(image);
  };

  const onTitleChange = (e) => {
    if (showTitleError && e.target.value !== title) {
      setShowTitleError(false);
    }
    setTitle(e.target.value);
  };

  const onStatusChange = (e) => {
    if (showStatusError && e.target.value !== status) {
      setShowStatusError(false);
    }
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      router.push("#title");
      setShowTitleError(true);
      return;
    }

    if (showSelectStatus && !status) {
      router.push("#status");
      setShowStatusError(true);
      return;
    }

    const formObject = {
      imgURL,
      title,
      description,
      status,
    };
    onSubmit(formObject);
  };

  return (
    <>
      <section className={`${styles.formContainer}`}>
        <div className={styles.imgContainer}>
          <Image src={imgURL} width={400} height={270} alt="Imagen de la lista" />
          <div className={styles.uploadImgContainer}>
            <input ref={uploadFileRef} onChange={(e) => handleUpFileChange(e)} id="fileUpload" name="fileUpload" type="file" accept=".jpg, .jpeg, .png, .webp" />
            <Button text="Subir imagen" mode="primary" onClick={handleUploadImgButton} />
          </div>
        </div>

        {/* Title */}
        <div className={`${styles.titleContainer} ${styles.inputContainer}`} id="title">
          <input type="text" placeholder="Título" name="title" value={title} onChange={(e) => onTitleChange(e)}></input>
          <ErrorTooltip error="Se debe de poner un título" show={showTitleError} />
        </div>

        {/* Description */}
        <div className={`${styles.descriptionContainer} ${styles.inputContainer}`} id="description">
          <textarea placeholder="Descripción" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* Status  */}
        <div className={`${`${styles.statusContainer} ${styles.inputContainer}`} ${showSelectStatus ? styles.show : ""}`} id="status">
          <select name="select" value={status} onChange={(e) => onStatusChange(e)}>
            <option value="" disabled>
              {`- Selecciona un estado -`}
            </option>
            {STATUS_ORDER.map((status, i) => (
              <option value={status} key={i}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
          <ErrorTooltip error="Se debe de seleccionar un estado" show={showStatusError} />
        </div>

        {/* Action buttons */}
        <div className={styles.actionButtonsContainer}>
          <Button mode="primary" text="Guardar" fullWidth="true" onClick={handleSubmit} />
          <Button mode="default" text="Cancelar" fullWidth="true" />
        </div>
      </section>
    </>
  );
};
