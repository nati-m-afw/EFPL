import axios from "axios";
import router from "../router/index";
import store from "./index";
const baseURL = process.env.VUE_APP_API_BASE_URL;
export default {
  state: {
    admins: [],
    currentAdmin: {},
  },
  getters: {
    allAdmins: (state) => state.admins,
    currentAdmin: (state) => state.currentAdmin,
  },
  actions: {
    // set current admin
    async setAdmin({ commit }) {
      let currentAdmin = JSON.parse(window.localStorage.currentAdmin);
      commit("SET_CURRENT_ADMIN", currentAdmin);
    },
    // log out admin
    logOutAdmin({ commit }) {
      commit("LOG_OUT");
      router.push({ name: "home" });
    },
    // login admin
    async loginAdmin({ commit }, { email, password }) {
      await axios
        .post(`${baseURL}/admin/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status === 201) {
            store.dispatch("Global/setNotificationInfo", {
              showNotification: true,
              notificationType: "success",
              notificationMessage: `${response.data.email} successfully logged in`,
            });
            commit("SET_CURRENT_ADMIN", response.data);
            router.replace({ name: "admin" });
            console.log("logged in");
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            store.dispatch("Global/setNotificationInfo", {
              showNotification: true,
              notificationType: "error",
              notifcationMessage: `${err.response.data}`,
            });
          }
        });
    },
    // request rest
    async requestReset(context, email) {
      console.log(email);
      axios
        .post(`${baseURL}/admin/requestReset`, { email: email })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            store.dispatch("Global/setNotificationInfo", {
              showNotification: true,
              notificationType: "success",
              notificationMessage: `Email successfully sent to ${email} `,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            store.dispatch("Global/setNotificationInfo", {
              showNotification: true,
              notificationType: true,
              notifcationMessage: `${err.response.data}`,
            });
          }
        });
    },
    // reset pass
    async resetPassword(context, password) {
      const token = router.currentRoute.value.params.token;
      axios
        .post(`${baseURL}/admin/resetPass/${token}`, {
          password: password,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            store.dispatch("Global/setNotificationInfo", {
              showNotification: true,
              notificationType: "success",
              notificationMessage: `Password Successfully Reset `,
            });
            router.push({ name: "admin-login" });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            store.dispatch("Global/setNotificationInfo", {
              showNotification: true,
              notificationType: true,
              notifcationMessage: `${err.response.data}`,
            });
          }
        });
    },
  },
  mutations: {
    SET_ADMINS: (state, admins) => (state.admins = admins),
    LOG_OUT: (state) => {
      state.currentAdmin = {};
      window.localStorage.setItem("currentAdmin", JSON.stringify({}));
    },
    SET_CURRENT_ADMIN: (state, admin) => {
      state.currentAdmin = admin;
      window.localStorage.setItem("currentAdmin", JSON.stringify(admin));
    },
  },
};
