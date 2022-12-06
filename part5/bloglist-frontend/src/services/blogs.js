import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async (token) => {
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error(e.data.error);
  }
};

const create = async (title, author, url, token) => {
  const response = await axios.post(
    baseUrl,
    {
      title,
      author,
      url,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.data?.token) {
    return response.data;
  }
  if (response.data?.error) {
    throw new Error(response.data.error);
  }
};

export default { getAll, create };
