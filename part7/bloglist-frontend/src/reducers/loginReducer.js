import { createSlice } from "@reduxjs/toolkit";
import { blogsServiceActions } from "./blogsReducer";
import blogsService from "../services/blogsService";
import { userServiceActions } from "./usersReducer";
import usersService from "../services/usersService";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setToken(state, action) {
      return action.payload;
    }
  }
});

export const { setToken } = loginSlice.actions;

export const loginServiceActions = (service) => {
  const actions = {
    authenticate: (username, password) => async (dispatch) => {
      const result = await service.login(username, password);
      window.localStorage.setItem("token", JSON.stringify(result));
      dispatch(actions.init());
    },
    init: () => async (dispatch) => {
      const token = JSON.parse(window.localStorage.getItem("token"));
      if (token) {
        dispatch(setToken(token));
        dispatch(blogsServiceActions(blogsService(token)).getAll());
        dispatch(userServiceActions(usersService(token)).getAll());
      }
    },
    logout: () => async (dispatch) => {
      window.localStorage.removeItem("token");
      dispatch(setToken(null));
    }
  };
};

export default loginSlice.reducer;