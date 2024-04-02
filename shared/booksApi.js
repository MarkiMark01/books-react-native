import axios from "axios";

const instance = axios.create({
  baseURL: "https://66068cdbbe53febb857e25cd.mockapi.io/api/b/books",
});

export const getNewBooks = async () => {
  try {
    const result = await instance.get("/");
    return result.data;
  } catch (error) {
    console.error("Error fetching new contacts:", error);
    throw error;
  }
};
export const getNewUniqueBooks = async (id) => {
  try {
    const result = await instance.get(`/books/${id}`);
    return result.data;
  } catch (error) {
    console.error("Error fetching new contacts:", error);
    throw error;
  }
};
