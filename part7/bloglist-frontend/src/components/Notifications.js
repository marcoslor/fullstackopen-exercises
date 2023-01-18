import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeNotificationAction } from "../reducers/notificationsReducer";

const Notification = ({ notification }) => {
  const dispatch = useDispatch();

  if (!notification.message) {
    return null;
  }

  const onClose = () => {
    dispatch(removeNotificationAction(notification.uuid));
  };

  return (
    <Toast bg={notification.type || "primary"} onClose={onClose}>
      <Toast.Header>
        <strong className="me-auto">
          {notification.title || "Notification"}
        </strong>
      </Toast.Header>
      <Toast.Body>{ notification.message }</Toast.Body>
    </Toast>
  );
};

const Notifications = (params) => {
  const notifications = useSelector((state) => state.notifications);

  return (
    <>
      <ToastContainer {...params}>
        {
          notifications.map((notification) => (
            <Notification notification={notification} key={notification.uuid} />
          ))
        }
      </ToastContainer>
    </>
  );
};

export default Notifications;