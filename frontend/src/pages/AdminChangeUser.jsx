import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import IdContext from "../Context/IdContext";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import ScrollToTop from "./ResetScrollOnPage";
import Vehicule from "../components/Vehicule";
import "../scss/AdminChangeUser.scss";

function AdminChangeUser() {
  const { user, setUser } = useContext(UserContext);
  const { setVehicules, vehicules } = useContext(IdContext);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/checkVehicule/${user.id}`)
      .then((res) => setVehicules(res.data))
      .catch((err) => console.error(err));
  }, [user.id]);
  const [toPushInDB, setToPushInDB] = useState([]);

  // envoi des informations vers le back

  const sendtoBack = () => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/vehicules`, toPushInDB, {
        withCredentials: true,
      })
      .catch((err) => console.error(err));
    setTimeout(() => {
      window.location.href = "/Admin";
    }, 3800);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const date = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 < 10
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1
    }-${
      new Date().getDay() < 10 ? `0${new Date().getDay()}` : new Date().getDay()
    }`;
    console.info(user);
    axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/adminEditUser`,
      {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        anniversaire: user.anniversaire.slice(0, 10),
        email: user.email,
        rue: user.rue,
        codePostal: user.code_postal,
        ville: user.ville,
        derniereMaj: date,
      },
      { withCredentials: true }
    );
    setTimeout(() => {
      window.location.href = "/Admin";
    }, 3800);
  };
  return (
    <div className="backgroundImageMain">
      <div className="profil">
        <h1>
          {user.prenom} {user.nom}
        </h1>
      </div>
      <div className="profil-main">
        <ScrollToTop />
        <div className="profil-container">
          <div className="general-container">
            <div className="info-container">
              <div className="info-principales">
                <h2>Informations principales</h2>
                <form>
                  <input
                    name="nom"
                    value={user.nom}
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                  <input
                    name="prenom"
                    value={user.prenom}
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    name="anniversaire"
                    value={user.anniversaire.slice(0, 10)}
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                  <input
                    name="email"
                    value={user.email}
                    readOnly={user.email}
                    type="email"
                  />
                </form>
              </div>
              <div className="info-localisation">
                <h2>Informations de localisation</h2>
                <form>
                  <input
                    name="rue"
                    value={user.rue}
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                  <input
                    name="code_postal"
                    value={user.code_postal}
                    type="number"
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                  <input
                    name="ville"
                    value={user.ville}
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                  />
                </form>
              </div>
              <div className="buttons">
                <button
                  type="submit"
                  className="button blue-button"
                  onClick={handleChange}
                >
                  Enregistrer les changements
                </button>

                <button
                  type="button"
                  className="no-button"
                  onClick={() => window.location.reload()}
                >
                  Annuler les changements
                </button>
              </div>
            </div>
          </div>
        </div>
        {vehicules && vehicules.length !== 0 ? (
          <div className="myVehicule_allpage">
            <div className="vehicule_card_container">
              {vehicules &&
                vehicules.map((vehicule) => (
                  <div className="vehicule_card" key={vehicule.id}>
                    <Vehicule
                      vehiculeMarque={vehicule.marque_name}
                      vehiculeModele={vehicule.modele_name}
                      vehiculeId={vehicule.id}
                      id={user.id}
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
                btnLink="/AdminChangeUser"
              />
            </div>
          </div>
        ) : (
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
                btnLink="/AdminChangeUser"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminChangeUser;
