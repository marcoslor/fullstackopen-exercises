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

const create = async (blog, token) => {
  const response = await axios.post(
    baseUrl,
    blog,
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

const put = async (id, blog, token) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (response.data?.error) {
    throw new Error(response.data.error);
  }

  return response.data;
};

const remove = async (id, token) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (response.data?.error) {
    throw new Error(response.data.error);
  }

  return response.data;
};

export default { getAll, create, put, remove };
