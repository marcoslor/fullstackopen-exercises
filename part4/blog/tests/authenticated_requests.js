const authenticationHeaders = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

const getLoginResponse = async (api, username, password) => {
  const response = await api.post("/api/login").send({ username, password }).expect(200);
  return response;
};

const getAuthenticatedHeader = async (api, username, password) => {
  const response = await getLoginResponse(api, username, password);
  expect(response.body.token).toBeDefined();
  const token = response.body.token;
  return authenticationHeaders(token);
};

module.exports = {
  authenticationHeaders,
  getLoginResponse,
  getAuthenticatedHeader,
};