import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pushNotificationAction } from "./reducers/notificationsReducer";

import Notifications from "./components/Notifications";

import loginService from "./services/loginService";
import blogsService from "./services/blogsService";

import { loginServiceActions, setToken } from "./reducers/loginReducer";
import { userServiceActions } from "./reducers/usersReducer";
import { blogsServiceActions } from "./reducers/blogsReducer";

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import UsersList from "./components/UserList";
import usersService from "./services/usersService";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

const retriveToken = () => {
  return JSON.parse(window.localStorage.getItem("token"));
};

const App = () => {
  const token = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const retrivedToken = retriveToken();
    if (retrivedToken) {
      dispatch(setToken(retrivedToken));
      dispatch(blogsServiceActions(blogsService(retrivedToken)).getAll());
      dispatch(userServiceActions(usersService(token)).getAll());
      return;
    }

    const path = window.location.pathname;
    if (path !== "/login") {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    dispatch(loginServiceActions(loginService).logout());
    dispatch(pushNotificationAction({ message: "Logged out successfully", type: "success" }));
    navigate("/login");
  };

  return (
    <>
      {!token && (
        <>
          <div className="position-relative">
            <Notifications
              style={{
                top: "1.5rem",
                right: "1.5rem",
              }}
            />
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
      {token && (
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Blogs</Navbar.Brand>
              <Nav className="me-auto">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </Nav>
              <div>
                <span>Hello, {token.username}</span>{" "}
                <Button onClick={logout}>Logout</Button>
              </div>
            </Container>
          </Navbar>
          <div className="position-relative">
            <Notifications
              style={{
                top: "1.5rem",
                right: "1.5rem",
              }}
            />
          </div>
          <Container className="pt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id" element={<UserView />} />
              <Route path="/blogs/:id" element={<BlogView />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Container>
        </>
      )}
    </>
  );
};

export default App;
