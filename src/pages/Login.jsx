import { useContext, useState } from "react";
import { loginService } from "../services/UserService";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import "../index.css";

const Login = () => {
  const { login, user: currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    loginService(user)
      .then((token) => {
        login(token);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="mt-3 mb-2">
      <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label form-label-center">
            Email
          </label>
          <input
            name="email"
            onChange={handleInputChange}
            value={user.email}
            type="email"
            className="form-control form-control-custom"
            id="email"
            required
            placeholder="Add a email..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label form-label-center">
            Password
          </label>
          <input
            name="password"
            onChange={handleInputChange}
            value={user.password}
            type="password"
            className="form-control form-control-custom"
            id="password"
            required
            placeholder="Add a password..."
          />
        </div>
        {error && <p className="text-danger">{error.message}</p>}
        <div className="btn-container">
          <button 
            type="submit" 
            className="btn btn-custom btn-lg px-5"
          >
            Entrar
          </button>
      
        </div>
      </form>
    </div>
  );
};

export default Login;
