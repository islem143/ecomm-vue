import axios from "../http";
const authStore = {
  namespaced: true,
  state: {
    user: {
      data: localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("user"))
        : "",
      token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    },
  },
  getters: {
    isAuth(state) {
      return !!state.user.token;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user.data = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setToken(state, token) {
      state.user.token = token;
      localStorage.setItem("token", token);
    },

    logout(state) {
      state.user = {
        data: null,
        token: "",
      };

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  actions: {
    async login({ commit }, user) {
      return await axios
        .post("/api/login", user)
        .then((res) => {
          const user = res.data.user;
          const token = res.data.token;
          commit("setUser", user);
          commit("setToken", token);

          return res;
        })
        .catch((err) => {
          return Promise.reject(err.response.data);
        });
    },
    async register({ commit }, user) {
      return await axios
        .post("/api/register", user)
        .then((res) => {
          const user = res.data.user;
          const token = res.data.token;
          commit("setUser", user);
          commit("setToken", token);

          return res;
        })
        .catch((err) => {
          return Promise.reject(err.response.data);
        });
    },
    async logout({ commit }, user) {
      return await axios
        .post("/api/logout")
        .then((res) => {
          commit("logout");
          return res;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  modules: {},
};

export default authStore;
