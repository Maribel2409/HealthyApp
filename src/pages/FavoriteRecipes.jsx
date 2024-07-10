import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PacmanLoading from "../components/PacmanLoading/PacmanLoading";
import { getFavorites } from "../services/RecipesService";

const FavoriteRecipes = () => {
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

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Recetas Favoritas</h2>
      {favorites.length > 0 ? (
        favorites.map((recipe) => (
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
                  <Link to={`/recipes/${recipe._id}`}>Ver más</Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Aún no has guardado recetas como favoritas</h2>
          <p>
            <Link to="/">Volver a la página principal</Link> para añadir recetas
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipes;
