<template>
  <el-container>
    <h2>Login</h2>
    <el-alert v-if="error" :title="error" type="error" effect="dark" />
    <el-form
      ref="info"
      :model="info"
      :rules="rules"
      label-position="top"
      label-width="120px"
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model="info.email" type="email"></el-input>
        <p style="color: red; margin: 0">{{ emailError }}</p>
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input v-model="info.password" type="password"></el-input>
        <p style="color: red; margin: 0">{{ passwordError }}</p>
      </el-form-item>
      <el-form-item>
        <el-button @click="login('info')" type="primary">Submit</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>


<script>
import axios from "../../http";
import { store } from "../../store";

export default {
  name: "Login",
  data() {
    return {
      store,
      info: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            type: "string",
            trigger: "blur",
          },
        ],
      },

      emailError: "",
      passwordError: "",
      error: "",
    };
  },
  methods: {
    clearErrors() {
      this.emailError = "";
      this.passwordError = "";
      this.nameError = "";
    },

    login(info) {
      this.clearErrors();
      let user = {
        email: this.info.email,
        password: this.info.password,
      };

      this.$refs[info]
        .validate()
        .then(() => {
          axios
            .post("http://localhost:8081/api/login", user)
            .then((res) => {
              console.log(res.data.token);
              const user = res.data.user;
              const token = res.data.token;

              store.login(user, token);
              console.log(user);
              if (user.role_id == 1) {
                this.$router.push("/dashboard");
              } else {
                this.$router.push("/products");
              }
            })
            .catch((err) => {
              if ("email" in err.response.data.errors) {
                this.emailError = err.response.data.errors.email;
              }
              if ("password" in err.response.data.errors) {
                this.passwordError = err.response.data.errors.password;
              }
            });
        })
        .catch((err) => {
          return;
        });
    },
  },
};
</script>


<style scoped>
.el-container {
  display: block;
  justify-content: center;

  width: 450px;
  margin: 50px auto;
}
</style>