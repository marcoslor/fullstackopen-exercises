import { useState, useRef } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";

import blogService from "./services/blogs";
import loginService from "./services/login";

import "./css/App.css";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";

const retriveToken = () => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  return token;
};

const Notification = ({ message, type, clearNotification }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={"alert " + type}>
      <p>{message}</p>
      <button onClick={clearNotification}>X</button>
    </div>
  );
};

const Notifications = ({ notifications, destroyNotification }) => {
  if (!notifications) {
    return null;
  }

  return (
    <div className="notifications">
      {notifications.map((notification) => (
        <Notification
          key={notification.uuid}
          message={notification.message}
          type={notification.type}
          clearNotification={() => destroyNotification(notification.uuid)}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(retriveToken());
  // This is kept to trigger a re-render when a notification is added to the ref
  const [notifications, setNotifications] = useState([]);

  const initialized = useRef(false);
  const notificationsRef = useRef([]);

  // This replaces the componentDidMount() lifecycle method, and useEffect()
  const initialize = () => {
    initialized.current = true;

    const retrivedToken = JSON.parse(window.localStorage.getItem("token"));
    setToken(retrivedToken);
    if (retrivedToken) {
      blogService.getAll(retrivedToken.token).then((blogs) => {
        setBlogs(blogs);
      });
    }
  };
  if (!initialized.current) {
    initialize();
  }

  const destroyNotification = (uuid) => {
    clearTimeout(
      notificationsRef.current.find(
        (notification) => notification.uuid === uuid
      ).timeout
    );

    const updatedNotifications = notificationsRef.current.filter(
      (notification) => notification.uuid !== uuid
    );

    notificationsRef.current = updatedNotifications;
    setNotifications(updatedNotifications);
  };
  const addNotification = (message, type) => {
    const notificationUUID = Math.random().toString(36).substring(7);

    const timeout = setTimeout(() => {
      destroyNotification(notificationUUID);
    }, 5000);
    const notification = { message, type, timeout, uuid: notificationUUID };

    const MAX_NOTIFICATIONS = 5;

    if (notificationsRef.current.length >= MAX_NOTIFICATIONS) {
      destroyNotification(notificationsRef.current[0].uuid);
    }

    setNotifications(notificationsRef.current.concat(notification));
    notificationsRef.current = notificationsRef.current.concat(notification);
  };
  const clearAllNotifications = () => {
    notificationsRef.current.forEach((notification) => {
      clearTimeout(notification.timeout);
    });

    notificationsRef.current = [];
    setNotifications([]);
  };

  const login = async (username, password) => {
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
  const logout = () => {
    setToken(null);
    clearAllNotifications();
    addNotification("Logged out successfully", "success");
  };

  const submitBlog = async (blog) => {
    try {
      await blogService.create(blog, token.token);
      addNotification(`Blog "${blog.title}" created successfully`, "success");
    } catch (error) {
      addNotification(error.response.data.error, "error");
    }

    const updatedBlogs = await blogService.getAll(token.token);
    setBlogs(updatedBlogs);
  };
  const likePost = async (blog) => {
    blogService.put(
      blog.id,
      {
        likes: blog.likes + 1,
      },
      token.token
    );

    setBlogs(
      blogs.map((b) =>
        b.id === blog.id ? { ...blog, likes: blog.likes + 1 } : b
      )
    );
  };
  const removePost = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id, token.token);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  return (
    <>
      <Notifications
        notifications={notifications}
        setNotifications={setNotifications}
        destroyNotification={destroyNotification}
      />
      {(token && (
        <>
          <div>
            <span>Hello, {token.username}</span>{" "}
            <button onClick={logout}>Logout</button>
          </div>
          <Togglable openButtonText="Add blog post" closeButtonText={"Cancel"}>
            <CreateBlog submitBlog={submitBlog} />
          </Togglable>
          <BlogList blogs={blogs} likePost={likePost} removePost={removePost} />
        </>
      )) || <Login login={login} />}
    </>
  );
};

export default App;
