import { Link } from "react-router-dom";
import { logout } from "../stores/AccessTokenStore";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "#83A580" }}>
          <img
            src="/Logo-Healthy2.png"
            className="img-fluid"
            style={{ width: "auto", height: "70px" }}
            alt="Healthy App"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "#83A580" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {!user && (
                <Link className="nav-link" aria-current="page" to="/register">
                  Registro
                </Link>
              )}
            </li>
            <li className="nav-item">
              {!user && (
                <Link className="nav-link" aria-current="page" to="/login">
                  Iniciar sesión
                </Link>
              )}
            </li>
            {user && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mi perfil
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <Link className="dropdown-item" to="/user-profile">
                      Mis datos personales
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/favorite-recipes">
                      Mis recetas favoritas
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Ver perfil completo
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              {user && (
                <Link className="nav-link" aria-current="page" to="/calendar">
                  Calendario
                </Link>
              )}
            </li>
            <li className="nav-item">
              {user && (
                <button onClick={logout} className="btn btn-custom ms-2">
                  Cerrar Sesión
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
