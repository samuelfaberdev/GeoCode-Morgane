import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* eslint-disable react/jsx-props-no-spreading */
// Le composant dropzone a besoin des prop spreading pour fonctionner. Vu avec SAM
import { useDropzone } from "react-dropzone";
import mailError from "../assets/LottieFiles/EmailError.json";
import Breadcrumb from "../components/breadcrumb";
import "../scss/admin-add-bornes.scss";
import ScrollToTop from "./ResetScrollOnPage";

export default function AdminAddBornes() {
  const [isAdmin, setIsAdmin] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [file, setFile] = useState({});

  const onDrop = useCallback(
    (acceptedFile) => {
      const csvFiles = acceptedFile.filter((item) =>
        item.name.endsWith(".csv")
      );
      console.info(csvFiles);
      if (csvFiles.length === 0) {
        console.info(toast);
        toast.error("Veuillez sélectionner un fichier CSV");
        return;
      }
      setFile(acceptedFile[0]);
    },
    [file]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
  });
  const url = `/api/uploads`;

  function Submit(e) {
    e.preventDefault();
    const formData = new FormData();
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", file);
    formData.append("fileName", file.name);
    axios.post(url, formData, config).catch((err) => console.error(err));
    setTimeout(() => {
      window.location.href = "/addBornesSuccess";
    }, 500);
  }

  useEffect(() => {
    axios
      .get(`/api/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "OK" && res.data.admin === true) {
          setIsLoggedIn(true);
          setIsAdmin(true);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
          setTimeout(() => {
            window.location.href = "/";
          }, 3800);
        }
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn || !isAdmin) {
    return (
      <section>
        <div className="containererror">
          <Lottie
            loop
            animationData={mailError}
            play
            style={{ width: 120, height: 120 }}
          />
          <h1>Accès Impossible</h1>
          <p className="message">
            {`
          Vous n'êtes pas autorisé(e) à acceder a cette page.  `}
            <br />
            {` Vous n'avez pas les droits nécéssaire ! Redirection vers l'accueil `}
          </p>
        </div>
      </section>
    );
  }

  const arianfil = [{ name: "Admin", link: "/admin" }];

  return (
    <div className="backgroundImageMain">
      <div className="add_bornes_page">
        <ScrollToTop />
        <Breadcrumb data={arianfil} currentname="Ajouter une borne" />
        <ToastContainer />
        <div className="add_bornes_page_container">
          <div className="upload-card">
            <h1>Ajouter des Bornes</h1>
            <div className="upload">
              {isDragActive ? (
                <p className="upload_text">
                  Relacher le fichier pour l'ajouter{" "}
                </p>
              ) : (
                <p className="upload_text">
                  Drag 'n' drop ou Cliquez <br />
                  pour sélectionner un fichier
                </p>
              )}
              <div className="upload_DragDrop" {...getRootProps()}>
                <input {...getInputProps()} />
              </div>
            </div>
            <div className="buttons-container">
              <button
                type="submit"
                className="buttons-container_blue"
                onClick={Submit}
              >
                Charger le CSV
              </button>

              <Link to="/admin">
                <button type="button" className="buttons-container_dark">
                  Annuler
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
