import { useEffect } from "react";
import { connect } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Notification = ({notification, setNotification}) => {
  useEffect(() => {
    const t = setTimeout(() => {
      setNotification("");
    }, 5000);

    return () => clearTimeout(t);
  }, [setNotification, notification]);

  if (notification === "") {
    return
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return <div style={style}>{notification}</div>;
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)