import createHttp from "./BaseService";

const http = createHttp(true);

export const createChat = (ingredients) => {
  return http.post("/chat", { ingredients });
};

export const createDayPlan = (data) => {
  return http.post("/dayPlan", data);
};