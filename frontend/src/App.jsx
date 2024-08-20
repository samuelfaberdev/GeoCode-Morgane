import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import BornesContext from "./Context/BornesContext";
import IdContext from "./Context/IdContext";
import MarqueModele from "./Context/MarqueModeleContext";
import FilterResearch from "./Context/ResearchContext";
import ReservationContext from "./Context/ReservationContext";
import UserContext from "./Context/UserContext";
import LocationContext from "./Context/locationContext";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import NavMobile from "./components/navmobile";
import "./scss/components/footer.scss";
import "./scss/root.scss";

import navData from "./data/NavBarData.json";

function App() {
  // context pour les filtres de recherche de borne
  const [research, setResearch] = useState({
    code: "",
    enseigne: "",
    rayon: "1085",
    puissance: "",
    disponible: "",
    prise: "",
  });

  const value = useMemo(
    () => ({ research, setResearch }),
    [research, setResearch]
  );

  // Contexte pour la geolocalisation de la personne

  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [bornes, setBornes] = useState([]);

  const positionValue = useMemo(
    () => ({ position, setPosition }),
    [position, setPosition]
  );
  // Contexte pour les bornes

  const bornesValue = useMemo(
    () => ({ bornes, setBornes }),
    [bornes, setBornes]
  );

  // Contexte sur les véhicules et les bornes id pour la réservation

  const [vehiculeId, setVehiculeId] = useState("");
  const [borneId, setBorneId] = useState({ borne_id: "", borne_name: "" });
  const reservationValue = useMemo(
    () => ({ vehiculeId, setVehiculeId, borneId, setBorneId }),
    [vehiculeId, setVehiculeId, borneId, setBorneId]
  );

  // Contexte sur le user pour l'inscription

  const date = new Date().toISOString();
  const newDate = date.slice(0, 10);
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    anniversaire: "",
    rue: "",
    code_postal: "",
    ville: "",
    nb_vehicule: 1,
    inscription: newDate,
    derniere_maj: newDate,
    connexion: newDate,
  });
  const UserValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  // Contexte pour les marques et modèle dans le panel admin

  const [marque, setMarque] = useState([]);
  const [modele, setModele] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/marques`)
      .then((resp) => {
        setMarque(resp.data);
      })
      .catch((err) => console.error(err));
    axios
      .get(`/api/modeles`)
      .then((res) => {
        setModele(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const marqueModele = useMemo(() => ({ marque, modele }), [marque, modele]);

  // Contexte sur l'id de l'utilisateur

  const [id, setId] = useState("");
  const [vehicules, setVehicules] = useState(null);
  const idValue = useMemo(
    () => ({ id, setId, vehicules, setVehicules }),
    [id, setId, vehicules, setVehicules]
  );

  function OnChangePage() {
    const resizeObserver = new ResizeObserver(() => {
      if (window.innerWidth < 721) {
        if (
          window.location.pathname === "/map" ||
          window.location.pathname === "/sign-in" ||
          window.location.pathname === "/success-auth"
        ) {
          document.documentElement.scrollTop = 0;
          document.body.classList.add("no-scroll");

          if (
            window.location.pathname === "/sign-in" ||
            window.location.pathname === "/success-auth"
          ) {
            document.querySelector("nav").style.visibility = "hidden";
            document.querySelector(".TAB").style.visibility = "hidden";
          } else {
            document.querySelector("nav").style.removeProperty("visibility");
            document.querySelector(".TAB").style.removeProperty("visibility");
          }
        } else {
          document.body.classList.remove("no-scroll");
        }
      }
    });
    resizeObserver.observe(document.body);
  }

  return (
    <>
      <Navbar navData={navData} />
      <main>
        <MarqueModele.Provider value={marqueModele}>
          <IdContext.Provider value={idValue}>
            <UserContext.Provider value={UserValue}>
              <BornesContext.Provider value={bornesValue}>
                <ReservationContext.Provider value={reservationValue}>
                  <LocationContext.Provider value={positionValue}>
                    <FilterResearch.Provider value={value}>
                      <Outlet onChange={OnChangePage()} />
                    </FilterResearch.Provider>
                  </LocationContext.Provider>
                </ReservationContext.Provider>
              </BornesContext.Provider>
            </UserContext.Provider>
          </IdContext.Provider>
        </MarqueModele.Provider>
      </main>
      <Footer className="FooterParams" />
      <NavMobile />
    </>
  );
}

export default App;
