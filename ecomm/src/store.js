import { reactive } from "vue";

export const store = reactive({
  user: {},
  token: "",

  login(user, token) {
    this.user = user;
    this.token = token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
  },
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user')
  }
});
