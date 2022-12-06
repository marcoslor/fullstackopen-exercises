import { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import blogService from "./services/blogs";
import style from "./css/App.css";

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

const LogoutButton = ({ setToken }) => {
  const onClick = () => {
    setToken(null);
  };

  return <button onClick={onClick}>Logout</button>;
};


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(retriveToken());
  const [notifications, setNotifications] = useState([]);

  const notificationsRef = useRef([]);

  useEffect(() => {
    if (token) {
      blogService.getAll(token.token).then((blogs) => {
        console.log("blogs", blogs);
        setBlogs(blogs);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
    
    if (token) {
      blogService.getAll(token.token).then((blogs) => setBlogs(blogs));
    } else {
      setBlogs([]);
    }
  }, [token]);

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
  }

  return (
    <>
      <Notifications
        notifications={notifications}
        setNotifications={setNotifications}
        destroyNotification={destroyNotification}
      />
      {(token && (
        <BlogList
          blogs={blogs}
          setBlogs={setBlogs}
          token={token}
          setToken={setToken}
          addNotification={addNotification}
          clearAllNotifications={clearAllNotifications}
        />
      )) || (
        <Login
          setToken={setToken}
          setBlogs={setBlogs}
          addNotification={addNotification}
          clearAllNotifications={clearAllNotifications}
        />
      )}
    </>
  );
};

export default App;
