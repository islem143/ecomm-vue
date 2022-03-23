import { reactive } from "vue";

export const store = reactive({
  user: {},
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",

  isAuth() {
    return !!this.token;
  },
  login(user, token) {
    this.user = user;
    this.token = token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.token = "";
    this.user = {};
  },
});
