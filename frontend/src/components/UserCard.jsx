import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import UserContext from "../Context/UserContext";
import "../scss/components/user-card.scss";

export default function UserCard({ firstname, lastname, img, userData }) {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const selectedUser = () => {
    setUser(userData);
  };
  // Permet d'ouvrir la popup
  const openPopup = () => {
    setOpen(true);
  };
  const deleteUser = async () => {
    let mess = "";
    await axios
      .delete(
        `/api/users/${userData.id}`,
        {
          user,
        },
        { withCredentials: true }
      )
      // eslint-disable-next-line no-undef, no-return-assign
      .then((res) => (mess = res.data.message))
      .catch((err) => console.error(err));

    setMessage(mess);
    if (mess === "Compte supprimé") {
      setTimeout(() => {
        window.location.href = "/liste-utilisateurs";
      }, 1800);
    }
  };
  return (
    <div className="card">
      <img src={img} alt="" />
      <h2>
        {firstname} {lastname}
      </h2>

      <Link
        to="/AdminChangeUser"
        className=" blue-button"
        onClick={selectedUser}
      >
        Editer ce profil
      </Link>
      <button type="button" className=" dark-blue-button" onClick={openPopup}>
        Supprimer ce profil
      </button>

      <Popup open={open} closeOnDocumentClick>
        Etes vous sûr de vouloir supprimer ce véhicule?
        <div className="container_button">
          <button type="button" onClick={deleteUser} className="yes">
            Oui
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
            }}
            className="no"
          >
            Non
          </button>
        </div>
        <p>{message}</p>
      </Popup>
    </div>
  );
}

UserCard.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  userData: PropTypes.func.isRequired,
};
