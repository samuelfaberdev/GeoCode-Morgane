import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import MarqueModeleContext from "../Context/MarqueModeleContext";

function Vehicule({
  vehiculeMarque,
  vehiculeModele,
  vehiculeId,
  id,
  toPushInDB,
  setToPushInDB,
}) {
  const [selectedMarque, setSelectedMarque] = useState(vehiculeMarque);
  const [selectedModele, setSelectedModele] = useState(vehiculeModele);
  const { marque, modele } = useContext(MarqueModeleContext);
  const [open, setOpen] = useState(false);

  /** Handles */
  // sert à mettre à jour la marque séléctionnée
  const handleSelectedMarque = (e) => {
    setSelectedMarque(e.target.value);
  };

  // sert à mettre à jour la marque séléctionnée
  const handleSelectedModele = (e) => {
    setSelectedModele(e.target.value);
  };
  // Permet d'ouvrir la popup
  const openPopup = () => {
    setOpen(true);
  };
  // Permet de créer une liste avec les véhicules à modifier
  const pushData = () => {
    setToPushInDB([
      ...toPushInDB,
      { id: vehiculeId, modele_id: selectedModele, proprietaire_id: id },
    ]);
  };

  const deleteVehicule = () => {
    axios.delete(`/api/vehicules/${vehiculeId}`);
    setTimeout(() => {
      window.location.href = "/suppressVehiculeSuccess";
    }, 1000);
  };
  return (
    <form className="form">
      <label className="form_placeholder_title" htmlFor="marque">
        Marque
      </label>
      <select
        onChange={handleSelectedMarque}
        className="form_placeholder_input"
      >
        <option>{vehiculeMarque}</option>
        {marque.map((item) => (
          <option key={item.name} value={item.id} name="marque_id">
            {item.name}
          </option>
        ))}
      </select>

      <label className="form_placeholder_title" htmlFor="model">
        Modèle
      </label>
      <select
        name="marque"
        onChange={handleSelectedModele}
        className="form_placeholder_input"
      >
        <option>{vehiculeModele}</option>
        {modele
          .filter((item) => {
            return +item.marque_id === +selectedMarque;
          })
          .map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>

      <div className="vehicule_card_button_container">
        <button
          type="button"
          className="vehicule_card_button"
          onClick={pushData}
        >
          Modifier ce véhicule
        </button>
        <button
          type="button"
          className="vehicule_card_button"
          onClick={openPopup}
        >
          Supprimer ce véhicule
        </button>
        <Popup open={open} closeOnDocumentClick>
          Etes vous sûr de vouloir supprimer ce véhicule?
          <div className="container_button">
            <button type="button" onClick={deleteVehicule} className="yes">
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
        </Popup>
      </div>
    </form>
  );
}
Vehicule.propTypes = {
  vehiculeMarque: PropTypes.string.isRequired,
  vehiculeModele: PropTypes.string.isRequired,
  vehiculeId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  toPushInDB: PropTypes.array.isRequired,
  setToPushInDB: PropTypes.func.isRequired,
};
export default Vehicule;
