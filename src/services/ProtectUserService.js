import createHttp from "./BaseService";

const http = createHttp(true);

export const editUser = (id, userData) => {
  return http.put(`/edit/${id}`, userData);
};

export const deleteUser = (id) => {
  return http.delete(`/user/${id}`);
};

export const uploadAvatarService = (formData) => {
  return http.post("/user/upload-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
