import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUserService } from "../services/AuthService";
import { editUser, uploadAvatarService } from "../services/UserService";

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    weight: 0,
    height: 0,
    objetive: "",
    ability: "",
    typeDiet: "",
    alergic: "",
    avatarUrl: ""
  });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (id) {
      getCurrentUserService(id)
        .then((user) => {
          setUser(user);
        })
        .catch((e) => console.log(e));
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (avatar) {
        const formData = new FormData();
        formData.append('avatar', avatar);
        const updatedUser = await uploadAvatarService(formData);
        setUser(updatedUser);
      }

      const editedUser = await editUser(id, user);
      navigate(`/user/${editedUser._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="mb-5">{id ? "Edit user" : "Add user"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
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
          <label htmlFor="email" className="form-label">Email</label>
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
          <label htmlFor="avatar" className="form-label">Avatar</label>
          <input
            type="file"
            className="form-control"
            name="avatar"
            id="avatar"
            onChange={handleAvatarChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-5">{id ? "Edit user" : "Add user"}</button>
      </form>
    </>
  );
}

export default UserForm;
