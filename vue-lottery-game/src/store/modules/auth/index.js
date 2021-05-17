import mutations from "@/store/modules/auth/mutations.js";
import getters from "@/store/modules/auth/getters.js";
import actions from "@/store/modules/auth/actions.js";

export default {
  state() {
    return {
      token: null,
      userId: null,
      userEmail: null,
      didAutoLogout: false,
    };
  },
  mutations,
  getters,
  actions,
};
