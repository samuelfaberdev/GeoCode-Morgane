import { useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import ScrollToTop from "./ResetScrollOnPage";

function AdminChangeUser() {
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    e.preventDefault();
    const date = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 < 10
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1
    }-${
      new Date().getDay() < 10 ? `0${new Date().getDay()}` : new Date().getDay()
    }`;

    axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/adminEditUser`,
      {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        anniversaire: user.anniversaire,
        email: user.email,
        rue: user.rue,
        codePostal: user.code_postal,
        ville: user.ville,
        derniereMaj: date,
      },
      { withCredentials: true }
    );
  };
  return (
    <div className="backgroundImageMain">
      <div className="profil-main">
        <ScrollToTop />
        <div className="profil-container">
          <div className="general-container">
            <div className="profil">
              <h1>
                {user.firstname} {user.lastname}
              </h1>
            </div>
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
      </div>
    </div>
  );
}

export default AdminChangeUser;
