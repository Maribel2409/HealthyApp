import { useContext, useEffect, useState } from "react";
import PacmanLoading from "../components/PacmanLoading/PacmanLoading";
import { getFavorites } from "../services/RecipesService";

import { Link } from "react-router-dom";
import "../index.css";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites()
      .then((favoritesDB) => {
        setFavorites(favoritesDB);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PacmanLoading />
      </div>
    );
  }

  const generateAvatarUrl = (name) => {
    const initial = name ? name.trim().charAt(0).toUpperCase() : "";
    return `https://ui-avatars.com/api/?name=${initial}&size=100`;
  };

  return (
    <div className="container mt-5">
      <h4 className="h2 mt-2 mb-3">Mis datos personales</h4>
      <div className="text-center">
        <img
          src={generateAvatarUrl(user.name)}
          alt="Avatar"
          className="rounded-circle"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <h2 className="mt-3">{user.name}</h2>
        <p>{user.email}</p>
      </div>
      {favorites.length > 0 ? (
        <>
          <h4 className="h2 mt-2 mb-3">Mis Recetas Favoritas</h4>
          {favorites.map((recipe) => (
            <div
              className="card mb-3"
              style={{ maxWidth: "540px", margin: "20px auto" }}
              key={recipe._id}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={recipe.urlImage}
                    className="img-fluid rounded-start"
                    alt={recipe.name}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <p className="card-text">{recipe.phrase}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        {recipe.preparationTime} min
                      </small>
                    </p>
                    <Link
                      to={`/recipes/${recipe._id}`}
                      style={{ color: "#83a580" }}
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Aún no has guardado recetas como favoritas</h2>
          <p>
            <Link to="/" style={{ color: "#83a580" }}>
              Volver a la página principal
            </Link>{" "}
            para añadir recetas
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
