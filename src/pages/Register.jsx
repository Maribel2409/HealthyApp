import { useEffect, useState } from "react";
import { createUser } from "../services/UserService";
import Input from "../components/Input/Input";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { useNavigate } from "react-router-dom";
import PacmanLoading from "../components/PacmanLoading/PacmanLoading";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    weight: 0,
    height: 0,
    objetive: "",
    ability: "",
    typeDiet: "",
    alergic: "",
  });

  const [isLastStep, setIsLastStep] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleComplete = () => {
    setLoading(true);
    createUser(user)
      .then(() => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log("ERRROR", err);
        const errorMessage =
          err.message || "An error occurred, please try again.";

        console.log("errorMessage", errorMessage);
        setError(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  const tabChanged = ({ prevIndex, nextIndex }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
    setIsLastStep(nextIndex === 4);
  };

  useEffect(() => {
    const translateButtons = () => {
      const backButton = document.querySelector(
        ".wizard-footer-left .wizard-btn"
      );
      const nextButton = document.querySelector(
        ".wizard-footer-right .wizard-btn"
      );
      const completeButton = document.querySelector(
        ".wizard-complete .wizard-btn"
      );

      if (backButton) backButton.textContent = "Atrás";
      if (nextButton)
        nextButton.textContent = isLastStep ? "Finalizar" : "Siguiente";
      if (completeButton) completeButton.textContent = "Finalizar";
    };

    translateButtons();

    const observer = new MutationObserver(translateButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [isLastStep]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000); // 5 segundos

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <PacmanLoading />
      ) : (
        <>
          <FormWizard
            shape="circle"
            color="#83A580"
            style={{ borderColor: "#83A580" }}
            onComplete={handleComplete}
            onSubmit={handleComplete}
            onTabChange={tabChanged}
          >
            <FormWizard.TabContent title="Datos personales" icon="ti-user">
              <h2>Tus datos</h2>
              <Input
                value={user.name}
                onChange={handleInputChange}
                name="name"
                type="text"
                title="Nombre"
              />
              <Input
                value={user.email}
                onChange={handleInputChange}
                name="email"
                type="email"
                title="Email"
              />
              <Input
                value={user.password}
                onChange={handleInputChange}
                name="password"
                type="password"
                title="Contraseña"
              />
              <select
                className="form-select"
                aria-label="Default select example"
                name="gender"
                value={user.gender}
                onChange={handleInputChange}
              >
                <option selected>Selecciona el género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Detalles personales" icon="ti-heart">
              <h2>Objetivo</h2>
              <p>Información para tu plan de ejercicios</p>
              <Input
                value={user.weight}
                onChange={handleInputChange}
                name="weight"
                type="number"
                title="Tu peso"
                placeholder="En kilogramos"
              />
              <Input
                value={user.height}
                onChange={handleInputChange}
                name="height"
                type="number"
                title="Tu altura"
                placeholder="En centímetros"
              />
              <label htmlFor="objetive" className="form-label">
                ¿Cuál es tu objetivo principal?
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="objetive"
                value={user.objetive}
                onChange={handleInputChange}
              >
                <option selected>Elige tu objetivo</option>
                <option value="comer equilibrado">Comer equilibrado</option>
                <option value="perder peso">Perder peso</option>
                <option value="ganar músculo">Ganar músculo</option>
              </select>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Plan de alimentación" icon="ti-star">
              <h1>Tu Dieta</h1>
              <p>Información para tu dieta</p>
              <select
                className="form-select mb-4"
                aria-label="Default select example"
                name="ability"
                value={user.ability}
                onChange={handleInputChange}
              >
                <option selected>Tu habilidad en la cocina</option>
                <option value="bajo">
                  Bajo: El colacao cuenta como cocinar
                </option>
                <option value="medio">
                  Medio: Las lentejas no se me queman
                </option>
                <option value="avanzado">
                  Avanzado: David muñoz a mi lado es un mindundi
                </option>
              </select>
              <select
                className="form-select mb-4"
                aria-label="Default select example"
                name="typeDiet"
                value={user.typeDiet}
                onChange={handleInputChange}
              >
                <option selected>Tipo de dieta</option>
                <option value="omnivoro">
                  Omnivoro: como carne y casi todo
                </option>
                <option value="flexitariano">
                  Flexitariano: no excluyo la carne del todo{" "}
                </option>
                <option value="vegetariano">Vegetariano</option>
                <option value="vegano">Vegano</option>
                <option value="otra">Otra</option>
              </select>
              <label htmlFor="objetive" className="form-label">
                ¿Eres alérgico o intelerante a algún alimento?
              </label>
              <select
                className="form-select mb-4"
                aria-label="Default select example"
                name="alergic"
                value={user.alergic}
                onChange={handleInputChange}
              >
                <option selected>Tipo de alimento</option>
                <option value="ninguno">Ninguno</option>
                <option value="huevo">Huevo</option>
                <option value="marisco">Marisco</option>
                <option value="lactosa">Lactosa</option>
                <option value="gluten">Gluten</option>
                <option value="frutos secos">Frutos secos</option>
              </select>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Validación" icon="ti-check">
              <h1>¡Enhorabuena! ¡Has completado todos los pasos!</h1>
              <p>¡Estás en buenas manos! y no nos las lavamos a menudo</p>
              <quote>
                Las buenas recetas son como los buenos amigos: hacen que la vida
                sea más deliciosa
              </quote>
            </FormWizard.TabContent>
          </FormWizard>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
        </>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registro Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¡Te has registrado correctamente!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-custom ms-2"
            variant="primary"
            onClick={() => navigate("/login")}
          >
            Ir a Iniciar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
