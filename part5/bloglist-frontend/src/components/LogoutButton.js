const LogoutButton = ({ setToken }) => {
  const onClick = () => {
    setToken(null);
  };

  return <button onClick={onClick}>Logout</button>;
};

export default LogoutButton;