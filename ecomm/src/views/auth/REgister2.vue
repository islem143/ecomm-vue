<template>
  <el-container>
    <h2>Register</h2>
    <el-alert v-if="error" :title="error" type="error" effect="dark" />

    <el-form label-position="top" label-width="120px">
      <el-form-item label="Email">
        <el-input class="error" name="email" v-model="email"></el-input>
        <p class="error" :key="error.$uid" v-for="error of v$.email.$errors">
          <strong>{{ error.$property }}:</strong>{{ error.$message }}
        </p>

        {{ emailError }}
      </el-form-item>
      <el-form-item label="Name">
        <el-input name="name" v-model="name"></el-input>
        <p class="error"  :key="error.$uid" v-for="error of v$.name.$errors">
          <strong>{{ error.$property }}:</strong>{{ error.$message }}
        </p>
        {{ nameError }}
      </el-form-item>
      <el-form-item label="Password">
        <el-input name="password" type="password" v-model="password"></el-input>
        <p class="error"  :key="error.$uid" v-for="error of v$.password.$errors">
          <strong>{{ error.$property }}:</strong>{{ error.$message }}
        </p>
        {{ passwordError }}
      </el-form-item>
      <el-form-item label="Confirm Password">
        <el-input
          name="password"
          type="password"
          v-model="password_confirmation"
        ></el-input>
        <p class="error"  :key="error.$uid" v-for="error of v$.password_confirmation.$errors">
          <strong>{{ error.$property }}:</strong>{{ error.$message }}
        </p>
      </el-form-item>
      <el-form-item>
        <el-button @click="register" type="primary">Submit</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>


<script>
import axios from "../../http";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "Register",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      error: "",
      emailError: "",
      nameError: "",
      passwordError: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      name: { required },
      password: { required },
      password_confirmation: { required },
    };
  },
  methods: {
    clearErrors() {
      this.emailError = "";
      this.passwordError = "";
      this.nameError = "";
    },
    async register() {
      await this.v$.$validate();

      if (this.v$.$error) {
        return;
      }

      let user = {
        email: this.email,
        name: this.name,
        password: this.password,
        password_confirmation: this.password_confirmation,
      };
      this.clearErrors();
      axios.get("/sanctum/csrf-cookie").then((res) => {
        axios
          .post("http://localhost:8081/api/register", user)
          .then((res) => {
            console.log(res);
            this.$router.push("/login");
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response.data.message) {
              this.error = err.response.data.message;
            }
            if (err.response.data.errors.email) {
              this.emailError = err.response.data.errors.email[0];
            }
            if (err.response.data.errors.password) {
              this.passwordError = err.response.data.errors.password[0];
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
.el-input__inner{
  border: 1px solid red;
  overflow: hidden;
}
p.error{
  color: red;
}
</style>