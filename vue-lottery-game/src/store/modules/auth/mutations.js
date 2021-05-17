export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.userEmail = payload.userEmail;
    state.didAutoLogout = false;
  },
  didAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
