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
export const logout = async () => {
  const data = await authInstance.post("/users/logout");
  authInstance.defaults.headers.common.authorization = "";
  return data;
};
export const getCurrent = async (token) => {
  try {
    authInstance.defaults.headers.common.authorization = `Bearer ${token}`;
    const { data } = await authInstance.get("/users/current");
    return data;
  } catch (error) {
    authInstance.defaults.headers.common.authorization = "";
    throw error;
  }
};
