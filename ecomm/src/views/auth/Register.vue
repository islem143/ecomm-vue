<template>
  <el-container>
    <h2>Register</h2>
    <el-alert v-if="error" :title="error" type="error" effect="dark" />

    <el-form
      style="margin-top: 20px"
      ref="info"
      :model="info"
      :rules="rules"
      label-position="top"
      label-width="120px"
    >
      <el-form-item label="Email" prop="email">
        <el-input class="error" name="email" v-model="info.email"></el-input>

        <p style="color: red; margin: 0">{{ emailError }}</p>
        {{ nameError }}
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input name="name" v-model="info.name"></el-input>
        <p style="color: red; margin: 0">{{ nameError }}</p>
        {{ nameError }}
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          name="password"
          type="password"
          v-model="info.password"
        ></el-input>
        <p style="color: red; margin: 0">{{ passwordError }}</p>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="password_confirmation">
        <el-input
          name="password"
          type="password"
          v-model="info.password_confirmation"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="register('info')" type="primary">Submit</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>


<script>
import axios from "../../http";
import store from "../../store/store";

export default {
  name: "Register",

  data() {
    return {
      store,
      rules: {
        name: [
          {
            required: true,
            message: "Please enter your name",
            trigger: "blur",
          },
        ],
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
        password_confirmation: [
          {
            required: true,
            type: "string",
            trigger: "blur",
          },
        ],
      },
      info: {
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
      },

      error: "",
      emailError: "",
      nameError: "",
      passwordError: "",
    };
  },

  methods: {
    clearErrors() {
      this.emailError = "";
      this.passwordError = "";
      this.nameError = "";
    },
    register(info) {
      this.$refs[info]
        .validate()
        .then(() => {
          let user = {
            email: this.info.email,
            name: this.info.name,
            password: this.info.password,
            password_confirmation: this.info.password_confirmation,
          };
          this.clearErrors();

          store
            .dispatch("auth/register", user)
            .then((res) => {
              this.$router.push("/");
            })
            .catch((err) => {
              for (const key in err.errors) {
                this[key + "Error"] = err.errors[key].toString();
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
.el-input__inner {
  border: 1px solid red;
  overflow: hidden;
}
p.error {
  color: red;
}
</style>