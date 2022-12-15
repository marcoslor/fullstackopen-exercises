const Login = ({ login }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    login(username, password);
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit} id="login">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="user" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;