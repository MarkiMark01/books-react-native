import axios from "axios";

const authInstance = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
});

export const signup = async (data) => {
  const { data: result } = await authInstance.post("/users/signup", data);
  authInstance.defaults.headers.common.authorization = `Bearer ${result.token}`;
  return result;
};
export const login = async (data) => {
  const { data: result } = await authInstance.post("/users/login", data);
  authInstance.defaults.headers.common.authorization = `Bearer ${result.token}`;
  return result;
};
