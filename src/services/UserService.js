import createHttp from "./BaseService";

const http = createHttp();

export const createUser = (user) => {
  return http.post("/register", user);
};

export const loginService = (user) => {
  return http.post("/login", user);
};

export const editUser = (id, userData) => {
  return http.put(`/user/${id}`, userData);
};

export const deleteUser = (id) => {
  return http.delete(`/user/${id}`);
};

export const getCurrentUserService = (id) => {
  return http.get(`/user/${id}`).then(response => response.data);
};

export const uploadAvatarService = (formData) => {
  return http.post("/user/upload-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
