import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import mailError from "../assets/LottieFiles/EmailError.json";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import Vehicule from "../components/Vehicule";
import IdContext from "../Context/IdContext";
import "../scss/Myvehicule.scss";
import CheckToken from "../services/CheckToken";
import ScrollToTop from "./ResetScrollOnPage";

function MyVehicule() {
  CheckToken();

  const { id, setVehicules, vehicules } = useContext(IdContext);
  useEffect(() => {
    axios
      .get(`/api/checkVehicule/${id}`)
      .then((res) => setVehicules(res.data))
      .catch((err) => console.error(err));
  }, [id]);
  const [toPushInDB, setToPushInDB] = useState([]);

  // envoi des informations vers le back

  const sendtoBack = () => {
    axios
      .put(`/api/vehicules`, toPushInDB, {
        withCredentials: true,
      })
      .catch((err) => console.error(err));
  };

  if (!CheckToken()) {
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
  return vehicules && vehicules.length !== 0 ? (
    <>
      <ScrollToTop />
      <div className="backgroundImageMain">
        <div className="myVehicule_allpage">
          <div className="title_page">
            <h2>Voici la liste de vos véhicules</h2>
          </div>

          <div className="vehicule_card_container">
            {vehicules &&
              vehicules.map((vehicule) => (
                <div className="vehicule_card" key={vehicule.id}>
                  <Vehicule
                    vehiculeMarque={vehicule.marque_name}
                    vehiculeModele={vehicule.modele_name}
                    vehiculeId={vehicule.id}
                    id={id}
                    toPushInDB={toPushInDB}
                    setToPushInDB={setToPushInDB}
                  />
                </div>
              ))}
          </div>
          <div className="final_Button">
            <PrimaryButton
              btnText="Ajouter un nouveau véhicule"
              btnLink="/addYourVehicule"
            />
            <button
              type="button"
              className="vehicule_card_button"
              onClick={sendtoBack}
            >
              Enregistrer les changements
            </button>
            <SecondaryButton
              btnText="Annuler les changements"
              btnLink="/MyVehicules"
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <ScrollToTop />
      <div className="backgroundImageMain">
        <div className="myVehicule_allpage">
          <div className="title_page">
            <h2>Voici la liste de vos véhicules</h2>
          </div>

          <div className="vehicule_card_container">
            <p>Aucun véhicule enregistré. </p>
          </div>
          <div className="final_Button">
            <PrimaryButton
              btnText="Ajouter un nouveau véhicule"
              btnLink="/addYourVehicule"
            />
            <button
              type="button"
              className="vehicule_card_button"
              onClick={sendtoBack}
            >
              Enregistrer les changements
            </button>
            <SecondaryButton
              btnText="Annuler les changements"
              btnLink="/MyVehicules"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyVehicule;
