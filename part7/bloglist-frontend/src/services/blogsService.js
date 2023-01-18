import axios from "axios";
const baseUrl = "/api/blogs";

const services = (token) => {
  console.log("token", token);

  // Default config options
  const defaultOptions = {
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.token}`,
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return {
    getAll: async () =>
      await instance.get("/").then((res) => res.data),
    create: async (blog) =>
      await instance.post("/", blog).then((res) => res.data),
    put: async (id, blog) =>
      await instance.put(`/${id}`, blog).then((res) => res.data),
    remove: async (id) =>
      await instance.delete(`/${id}`).then((res) => res.data),
    getComments: async (id) =>
      await instance.get(`/${id}/comments`).then((res) => res.data),
    createComment: async (id, comment) =>
      await instance.post(`/${id}/comments`, { comment }).then((res) => res.data)
  };
};

export default services;
