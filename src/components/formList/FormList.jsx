"use client";
import { useEffect, useRef, useState } from "react";
import { Header } from "../ui/header/Header";
import styles from "./FormList.module.css";
import { STATUS, STATUS_LABELS, STATUS_ORDER } from "@/constants/statuses";
import Image from "next/image";
import { Button } from "../ui/button/Button";

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

  const handleSubmit = () => {
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
        <div className={`${styles.titleContainer} ${styles.inputContainer}`}>
          <input type="text" placeholder="Título" name="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
        </div>

        {/* Description */}
        <div className={`${styles.descriptionContainer} ${styles.inputContainer}`}>
          <textarea placeholder="Descripción" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* Status  */}
        <div className={`${`${styles.statusContainer} ${styles.inputContainer}`} ${showSelectStatus ? styles.show : ""}`}>
          <select name="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="" disabled>
              {`- Selecciona un estado -`}
            </option>
            {STATUS_ORDER.map((status, i) => (
              <option value={status} key={i}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
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
