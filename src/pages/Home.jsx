import { useContext, useEffect, useState } from "react";
import { createChat } from "../services/ChatService";
import { AuthContext } from "../contexts/AuthContext";
import { getRecipes } from "../services/RecipesService";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import PacmanLoading from "../components/PacmanLoading/PacmanLoading";
import { BsSearch } from "react-icons/bs";
import { INGREDIENTS_VALUES } from "../utils/ingredientsButtons";
import { Button, Modal } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipesApi, setRecipesApi] = useState([]);
  const [loadingApi, setLoadingApi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showScroll, setShowScroll] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSearchInput = (event) => {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
  };

  useEffect(() => {
    getRecipes()
      .then((recipesDB) => {
        setRecipes(recipesDB);
        setIngredients([]);
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
        setShowModal(true);
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
      {loadingApi ? (
        <>
          <div className="container text-center mb-5 mt-5">
            <h2 className="h2 mb-3">
              Sus recetas se están preparando...a fuego lento
            </h2>
            <p>En breves momentos las recibirá en su email</p>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center">Bienvenido</h2>
          <div style={{ position: "relative" }}>
            <input
              className="form-control me-2 mb-4 mt-3"
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
          <div className="container">
          <h2 className="h2 mb-4">Puedes crear tu receta customizada</h2>
          <p className="text-center">Elige los ingresdientes que quieres probar y prepararemos recetas para tí!</p>
            {user && (
              <form
                onSubmit={onSubmit}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "center",
                  boxShadow: "0 0 10px #83a580",
                  padding: "15px",
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
                        <i
                          className="fa-solid fa-check"
                          style={{ color: "#00ff6a" }}
                        ></i>
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
          </div>
          {user && recipesApi && (
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Tus recetas están listas</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>¡Resvisa tu email!</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => navigate("/favorite-recipes")}
                >
                  Ve a tus recetas
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          {loading ? (
            <>
              <div>
                <PacmanLoading />
              </div>
            </>
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
        </>
      )}
    </div>
  );
};

export default Home;
