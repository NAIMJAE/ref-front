import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtil";

const loadStateFromCookie = () => {
  const auth = getCookie("auth");

  const uid = auth?.userId;
  const name = auth?.username;
  const role = auth?.userRole;
  const accessToken = auth?.accessToken;
  const refreshToken = auth?.refreshToken;

  return { uid, name, role, accessToken, refreshToken};
};

const initState = {
  uid: "",
  name: "",
  role: "",
  accessToken: "",
  refreshToken: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadStateFromCookie() || initState,
  reducers: {
    login: (state, action) => {
      const data = action.payload;
      // 상태 업데이트
      state.uid = data.userId;
      state.name = data.username;
      state.role = data.userRole;
      state.accessToken = data.accessToken;
      state.refreshToken = data.refreshToken;
      // 쿠키 저장
      setCookie("auth", data, 1);
    },
    logout: (state) => {
      removeCookie("auth");
      return { ...initState };
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;