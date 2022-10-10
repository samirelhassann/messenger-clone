import { createSlice } from "@reduxjs/toolkit";
import { IReducerAction } from "../../interfaces/IReducerAction";
import { User } from "../../interfaces/User";

const initialState: User = {
  id: "",
  avatar: "",
  name: "",
  isLogged: false,
  isLoading: false,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadingInfos: (state: User) => {
      state.isLoading = true;
    },
    login: (state: User, action: IReducerAction) => {
      state.id = action.payload.id;
      state.avatar = action.payload.avatar;
      state.name = action.payload.name;
      state.isLogged = true;
      state.isLoading = false;
    },
  },
});

export const { login, loadingInfos } = slice.actions;

export default slice.reducer;
