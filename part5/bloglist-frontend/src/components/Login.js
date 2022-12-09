import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = ({
  setToken,
  addNotification,
  setBlogs,
  clearAllNotifications,
}) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const result = await loginService.login(username, password);
      setToken(result);
      localStorage.setItem("token", JSON.stringify(result));

      const blogs = await blogService.getAll(result.token);
      setBlogs(blogs);

      clearAllNotifications();
      addNotification("Logged in successfully", "success");
    } catch (error) {
      addNotification(error.response.data.error, "error");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" placeholder="user" required />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;