import axios from "axios";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

export default function ReservationCard({ id, borneId, date }) {
  const [borneInfo, setBorneInfo] = useState();

  const newDate = date.split("T");
  const dateArray = newDate[0].split("-");
  const dateFr = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;

  useEffect(() => {
    axios
      .get(`/api/borneinfo/${borneId}`)
      .then((res) => {
        setBorneInfo(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="reservation_card">
      <p className="nameborne">{borneInfo?.n_station}</p>
      <p className="date">{dateFr}</p>
      <div className="buttons-container">
        <button
          type="button"
          onClick={() =>
            axios
              .post(`/api/deletereservation`, {
                id,
              })
              .then(() => window.location.reload())
          }
        >
          Annuler la réservation
        </button>
      </div>
    </div>
  );
}

ReservationCard.propTypes = {
  id: PropTypes.number.isRequired,
  borneId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
