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
import store from "../../store/store";

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

      this.$refs[info].validate().then(() => {
        store
          .dispatch("auth/login", user)
          .then((res) => {
            if (res.data.user.role_id == 1) {
              this.$router.push("/dashboard");
            } else {
              store.dispatch("cart/getCartItems");
              this.$router.push("/products");
            }
          })
          .catch((err) => {
            for (const key in err.errors) {
              this[key + "Error"] = err.errors[key].toString();
            }
          });
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