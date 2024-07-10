import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PacmanLoading from "../components/PacmanLoading/PacmanLoading";
import { editUser, getCurrentUserService } from "../services/UserService";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
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

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      // Cargar los datos actuales del usuario cuando el componente se monte
      getCurrentUserService(user._id)
        .then((userDataFromServer) => {
          setUserData(userDataFromServer);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    editUser(user._id, userData)
      .then(() => {
        setLoading(false);
        setEditMode(false);
        // Actualización exitosa, podrías mostrar un mensaje de éxito o redirigir a otra página
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setLoading(false);
      });
  };

  if (!user) {
    return <PacmanLoading />;
  }

  return (
    <div className="container mt-5">
      <h4 className="h2 mt-2 mb-3">Mis datos personales</h4>
      <div className="text-center">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}&size=100`}
          alt="Avatar"
          className="rounded-circle"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Nombre"
              required
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Correo electrónico"
              required
            />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Contraseña"
            />
            <select
              className="form-select mb-2"
              aria-label="Género"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
            >
              <option value="">Selecciona el género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            <input
              type="number"
              name="weight"
              value={userData.weight}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Peso (kg)"
              min="0"
            />
            <input
              type="number"
              name="height"
              value={userData.height}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Altura (cm)"
              min="0"
            />
            <select
              className="form-select mb-2"
              aria-label="Objetivo"
              name="objetive"
              value={userData.objetive}
              onChange={handleInputChange}
            >
              <option value="">Elige tu objetivo</option>
              <option value="comer equilibrado">Comer equilibrado</option>
              <option value="perder peso">Perder peso</option>
              <option value="ganar músculo">Ganar músculo</option>
            </select>
            <select
              className="form-select mb-2"
              aria-label="Habilidad en la cocina"
              name="ability"
              value={userData.ability}
              onChange={handleInputChange}
            >
              <option value="">Tu habilidad en la cocina</option>
              <option value="bajo">Bajo: El colacao cuenta como cocinar</option>
              <option value="medio">Medio: Las lentejas no se me queman</option>
              <option value="avanzado">
                Avanzado: David muñoz a mi lado es un mindundi
              </option>
            </select>
            <select
              className="form-select mb-2"
              aria-label="Tipo de dieta"
              name="typeDiet"
              value={userData.typeDiet}
              onChange={handleInputChange}
            >
              <option value="">Tipo de dieta</option>
              <option value="omnivoro">Omnívoro: como carne y casi todo</option>
              <option value="flexitariano">
                Flexitariano: no excluyo la carne del todo
              </option>
              <option value="vegetariano">Vegetariano</option>
              <option value="vegano">Vegano</option>
              <option value="otra">Otra</option>
            </select>
            <select
              className="form-select mb-2"
              aria-label="Alergias o intolerancias alimentarias"
              name="alergic"
              value={userData.alergic}
              onChange={handleInputChange}
            >
              <option value="">Alergias o intolerancias alimentarias</option>
              <option value="ninguno">Ninguno</option>
              <option value="huevo">Huevo</option>
              <option value="marisco">Marisco</option>
              <option value="lactosa">Lactosa</option>
              <option value="gluten">Gluten</option>
              <option value="frutos secos">Frutos secos</option>
            </select>
            <button type="submit" className="btn btn-primary me-2">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditMode(false)}
            >
              Cancelar
            </button>
          </form>
        ) : (
          <>
            <h2 className="mt-3">{user.name}</h2>
            <p>{user.email}</p>
            <button className="btn btn-custom" onClick={handleEdit}>
              Editar
            </button>
          </>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/">Volver a la página principal</Link>
      </div>
    </div>
  );
};

export default UserProfile;
