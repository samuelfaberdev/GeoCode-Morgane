import "../scss/components/user-card.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../Context/UserContext";

export default function UserCard({ firstname, lastname, img, userData }) {
  const { setUser } = useContext(UserContext);

  const selectedUser = () => {
    setUser(userData);
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
      <button type="button" className=" dark-blue-button">
        Supprimer ce profil
      </button>
    </div>
  );
}

UserCard.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  userData: PropTypes.func.isRequired,
};
