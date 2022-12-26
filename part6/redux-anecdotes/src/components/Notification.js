import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notificationState = useSelector(state => state.notification)
  const dispatch = useDispatch();

  useEffect(() => {
    const t = setTimeout(() => dispatch(setNotification("")), 5000)

    return () => clearTimeout(t)
  }, [dispatch, notificationState]);

  if (notificationState === "") {
    return
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notificationState}
    </div>
  )
}

export default Notification