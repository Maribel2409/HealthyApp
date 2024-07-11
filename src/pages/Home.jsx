import { useContext, useEffect, useState } from "react";
import { createChat } from "../services/ChatService";
import { AuthContext } from "../contexts/AuthContext";
import { getRecipes } from "../services/RecipesService";
import "../index.css";
import { Link } from "react-router-dom";
import PacmanLoading from "../components/PacmanLoading/PacmanLoading";
import { BsSearch } from "react-icons/bs";
import { INGREDIENTS_VALUES } from "../utils/ingredientsButtons";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipesApi, setRecipesApi] = useState([]);
  const [loadingApi, setLoadingApi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showScroll, setShowScroll] = useState(false);

  const handleSearchInput = (event) => {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
  };

  useEffect(() => {
    getRecipes()
      .then((recipesDB) => {
        setRecipes(recipesDB);
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

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.find((ingredient) =>
        ingredient.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  const handleIngredient = (e) => {
    const { value } = e.target;
    if (ingredients.includes(value)) {
      setIngredients(
        ingredients.filter((ingredient) => {
          return ingredient !== value;
        })
      );
    } else {
      setIngredients([...ingredients, value]);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoadingApi(true);
    createChat(ingredients)
      .then((recipesApiRes) => {
        setRecipesApi(recipesApiRes.createdRecipes);
      })
      .catch((err) => {
        setLoadingApi(false);
        console.error(err);
      })
      .finally(() => setLoadingApi(false));
  };

  return (
    <div className="container mt-3">
      <h2>Bienvenido</h2>
      <div style={{ position: "relative" }}>
        <input
          className="form-control me-2 mb-3"
          type="search"
          placeholder="Busca tu receta"
          aria-label="Search"
          style={{ borderColor: "#83A580" }}
          onChange={handleSearchInput}
        />
        <BsSearch
          style={{
            position: "absolute",
            right: "30px",
            top: "8px",
            fontSize: "20px",
            color: "#83A580",
          }}
        />
      </div>

      {loadingApi ? <PacmanLoading /> : ""}
      {user && (
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {INGREDIENTS_VALUES.map((ingredient) => {
            const IconComponent = ingredient.iconComponent;
            return (
              <button
                key={ingredient.value}
                type="button"
                className="btn btn-custom-ingredients"
                value={ingredient.value}
                onClick={handleIngredient}
              >
                {!ingredients.includes(ingredient.value) ? (
                  IconComponent ? (
                    <IconComponent />
                  ) : (
                    <i className={`fa-solid ${ingredient.icon}`}></i>
                  )
                ) : (
                  <i className="fa-solid fa-check"></i>
                )}{" "}
                {ingredient.text}
              </button>
            );
          })}
          <div className="row w-100 btn-lg-custom">
            <div className="col d-flex justify-content-center mt-3">
              <button
                type="submit"
                className="btn btn-custom btn-padding-custom"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      )}
      {loading ? (
        <PacmanLoading />
      ) : (
        filteredRecipes.map((recipe) => (
          <div
            className="card mb-3 mt-5"
            style={{ maxWidth: "540px" }}
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
        ))
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

export default Home;
