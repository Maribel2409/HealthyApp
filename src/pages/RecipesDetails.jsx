import { useEffect, useState } from "react";
import { getRecipe, toggleFavorite } from "../services/RecipesService";
import { useNavigate, useParams } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "../index.css";
import PacmanLoading from "../components/PacmanLoading/PacmanLoading";


function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  library.add(solidHeart, regularHeart);

  useEffect(() => {
    getRecipe(id)
      .then((rcp) => {
        setRecipe(rcp);
        setIsFavorite(rcp.isFavorite || false);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
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

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toggleFavorite(id)
      .then((recipeDB) => setRecipe(recipeDB))
      .catch((e) => console.log(e));
  };

  if (loading) {
    return <PacmanLoading />;
  }

  return (
    <div className="container mt-5">
    <div style={{ textAlign: "center" }}>
      <h2 className="h2">{recipe.name}</h2>
      </div>
      <img
        src={recipe.urlImage}
        // src={recipe.imageUrl}
        alt={recipe.name}
        style={{
          marginTop: "20px",
          maxWidth: "300px",
          maxHeight: "auto",
          boxShadow: "0 0 10px #83A580",
          borderRadius: "5px",
          display: "block",
          margin: "0 auto",
        }}
      />

      <button onClick={handleToggleFavorite} className="favorite-button">
        <FontAwesomeIcon
          icon={isFavorite ? solidHeart : regularHeart}
          style={{ color: isFavorite ? "#83A580" : "black" }}
        />
      </button>

      <p className="mt-4 mb-3">{recipe.phrase}</p>

      <h3 className="mb-3">
        <u>Tiempo de preparación</u>: {recipe.preparationTime} minutos
      </h3>

      <h3>
        <u>Ingredientes</u> ({recipe.people} personas)
      </h3>
      <ul className="custom-list">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>
        <u>Elaboración</u>
      </h3>
      <ul className="custom-list">
        {recipe.steps.map((step, index) => (
          <li key={index}>
            <strong>Paso {index + 1}:</strong> {step}
          </li>
        ))}
      </ul>
      <button
        className={`scroll-to-top ${showScroll ? "show" : ""}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
}

export default RecipeDetails;
