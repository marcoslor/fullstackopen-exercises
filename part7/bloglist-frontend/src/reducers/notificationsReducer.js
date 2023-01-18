import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    addNotification(state, action) {
      return state.concat(action.payload);
    },
    removeNotification(state, action) {
      return state.filter((notification) => notification.uuid !== action.payload);
    }
  }
});

const { addNotification, removeNotification } = notificationsSlice.actions;

export const removeNotificationAction = (notification) => {
  return (dispatch) => {
    clearTimeout(notification.timeout);
    dispatch(removeNotification(notification));
  };
};

export const pushNotificationAction = (notification, t = 5000) => {
  return (dispatch) => {
    const notificationUUID = Math.random();
    const timeout = setTimeout(() => {
      dispatch(removeNotificationAction(notificationUUID));
    }, t);

    const notificationToAdd = { ...notification, timeout, uuid: notificationUUID };

    dispatch(addNotification(notificationToAdd));
  };
};

export default notificationsSlice.reducer;


