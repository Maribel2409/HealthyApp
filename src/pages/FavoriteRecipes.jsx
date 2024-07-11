import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PacmanLoading from "../components/PacmanLoading/PacmanLoading";
import { getFavorites } from "../services/RecipesService";

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    getFavorites()
      .then((favoritesDB) => {
        setFavorites(favoritesDB);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <div className="container mt-5 text-center">
      <h2 className="h2 mb-3">Recetas Favoritas</h2>
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
            <Link to="/" style={{ color: "#83a580" }}>
              Volver a la página principal
            </Link>{" "}
            para añadir recetas
          </p>
        </div>
      )}

      <button
        className={`scroll-to-top ${showScroll ? "show" : ""}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
};

export default FavoriteRecipes;
