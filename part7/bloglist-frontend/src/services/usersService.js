import axios from "axios";

const usersService = (token) => {
  const baseUrl = "/api/users";
  const defaultOptions = {
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.token}`,
    },
  };
  const instance = axios.create(defaultOptions);

  return {
    getAll: async () => await instance.get("/").then((res) => res.data),
  };
};

export default usersService;