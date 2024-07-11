import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function UserForm() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: user.name || "",
    email: user.email || "",
    gender: user.gender || "",
    weight: user.weight || 0,
    height: user.height || 0,
    objetive: user.objetive || "",
    ability: user.ability || "",
    typeDiet: user.typeDiet || "",
    alergic: user.alergic || "",
    avatarUrl: user.avatarUrl || "",
  });
  const [avatar, setAvatar] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h1 className="mb-5">{id ? "Edit user" : "Add user"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">
            Avatar
          </label>
          <input
            type="file"
            className="form-control"
            name="avatar"
            id="avatar"
            onChange={handleAvatarChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          {id ? "Edit user" : "Add user"}
        </button>
      </form>
    </>
  );
}

export default UserForm;
