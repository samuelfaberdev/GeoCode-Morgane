import axios from "axios";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import data from "../data/UserDataTest.json";
import CheckToken from "../services/CheckToken";

import "../scss/reservation.scss";

import mailError from "../assets/LottieFiles/EmailError.json";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PastReservationCard from "../components/PastReservationCard";
import ReservationCard from "../components/ReservationCard";
import ScrollToTop from "./ResetScrollOnPage";

export default function Reservation() {
  const [lastname, setLastname] = useState();
  const [firstname, setFirstname] = useState();
  const [avatar, setAvatar] = useState(data[0].img);

  const [reservation, setReservation] = useState();
  CheckToken();
  useEffect(() => {
    axios
      .get(`/api/takedata`, {
        withCredentials: true,
      })
      .then((resp) => {
        setLastname(resp.data[0].nom);
        setFirstname(resp.data[0].prenom);
        setAvatar(data[0].img);
      });

    axios
      .get(
        `/api/reservationsBrowse`,

        {
          withCredentials: true,
        }
      )
      .then((respo) => {
        setReservation(respo.data);
      });
  }, []);

  console.info(CheckToken());
  if (CheckToken() === false) {
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
          Vous devez vous connecter pour acceder à cette page.  `}
            <br /> {` Vous allez être redirigé(e) vers la page de connexion. `}
          </p>
          <PrimaryButton btnText="Se connecter" btnLink="/sign-in" />
        </div>
      </section>
    );
  }
  return (
    <main className="reservation-main">
      <ScrollToTop />
      <div className="reservation-container">
        <Link to="/profil">Retour sur le profil</Link>
        <div className="info-container">
          <img src={avatar} alt="" />
          <h1>
            {firstname} {lastname}
          </h1>
        </div>
        <div className="next-reservation-container">
          <h2>Réservation à venir</h2>
          <div className="reservation-card-container">
            {reservation &&
              reservation.map((res) => {
                const hour = res.heure.split(":")[0];
                const minutes = res.heure.split(":")[1];
                const seconds = res.heure.split(":")[2];

                const reservationDate = new Date(res.date_reservation);
                reservationDate.setHours(hour);
                reservationDate.setMinutes(minutes);
                reservationDate.setSeconds(seconds);

                if (reservationDate >= new Date()) {
                  return (
                    <ReservationCard
                      key={res.id}
                      id={res.id}
                      borneId={res.borne_id}
                      date={res.date_reservation}
                    />
                  );
                }
                return null;
              })}
          </div>
        </div>

        <div className="past-reservation-container">
          <h2>Réservation passés</h2>
          {reservation &&
            reservation.map((res) => {
              const hour = res.heure.split(":")[0];
              const minutes = res.heure.split(":")[1];
              const seconds = res.heure.split(":")[2];

              const reservationDate = new Date(res.date_reservation);
              reservationDate.setHours(hour);
              reservationDate.setMinutes(minutes);
              reservationDate.setSeconds(seconds);

              if (reservationDate < new Date()) {
                return (
                  <PastReservationCard
                    key={res.id}
                    borneId={res.borne_id}
                    date={res.date_reservation}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>
    </main>
  );
}
