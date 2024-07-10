import createHttp from "./BaseService";

const http = createHttp();

export const getRecipes = () => {
  return http.get("/recipes");
};

export const getRecipe = (id) => {
  return http.get(`/recipes/${id}`);
};
export const toggleFavorite = (id) => {
  return http.put(`/recipes/${id}/favorite`);
};
export const getFavorites = (id) => {
  return http.get(`/recipes/favorites`);
};
