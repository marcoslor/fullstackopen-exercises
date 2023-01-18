import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    }
  }
});

export const { setUsers } = usersSlice.actions;

export const userServiceActions = (service) => {
  return {
    getAll: () => async (dispatch) => {
      const users = await service.getAll();
      console.log({ "fetched": users });
      dispatch(setUsers(users));
    }
  };
};

export default usersSlice.reducer;