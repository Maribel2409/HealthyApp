import createHttp from "./BaseService";

const http = createHttp();

export const getCurrentUserService = () => {
  return http.get("/users/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};
