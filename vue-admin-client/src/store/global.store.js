export default {
  namespaced: true,
  state: {
    connection: true,

    // notification stuff
    showNotification: false,
    notificationType: "warning",
    notificationMessage: "",
    notificationDuration: 4000,

    // sidebar
    showSidebar: false,
  },
  getters: {
    getConnection: function (state) {
      return state.connection;
    },
  },
  mutations: {
    SET_CONNECTION(state, payload) {
      state.connection = payload;
    },
    SET_NOTIFICATION_INFO(state, payload) {
      (state.showNotification = payload.showNotification
        ? payload.showNotification
        : false),
        (state.notificationType = payload.notificationType
          ? payload.notificationType
          : "success"),
        (state.notificationMessage = payload.notificationMessage
          ? payload.notificationMessage
          : ""),
        (state.notificationDuration = payload.notificationDuration
          ? payload.notificationDuration
          : 6000);
    },
    SET_SHOW_SIDEBAR(state, payload) {
      console.log(payload);
      state.showSidebar = payload.showSidebar;
      console.log(state.showSidebar);
    },
  },
  actions: {
    setConnection(context, connection) {
      context.commit("SET_CONNECTION", connection);
    },
    setNotificationInfo(context, notificationInfo) {
      context.commit("SET_NOTIFICATION_INFO", notificationInfo);
    },

    setShowSidebar(context, showSidebar) {
      context.commit("SET_SHOW_SIDEBAR", showSidebar);
    },
  },
};
