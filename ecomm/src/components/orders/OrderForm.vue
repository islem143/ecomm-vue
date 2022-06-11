<template>
  <h2>Order Information</h2>
  <el-alert v-if="error" :title="error" type="error" effect="dark" />
  <el-form
    ref="info"
    :model="info"
    :rules="rules"
    label-position="top"
    label-width="120px"
    class="form"
  >
    <el-form-item label="First Name" prop="firstName">
      <el-input v-model="info.firstName" type="firstName"></el-input>
      <p style="color: red; margin: 0">{{ firstNameError }}</p>
    </el-form-item>

    <el-form-item label="Last Name" prop="lastName">
      <el-input v-model="info.lastName" type="lastName"></el-input>
      <p style="color: red; margin: 0">{{ lastNameError }}</p>
    </el-form-item>
    <el-form-item label="Phone" prop="phone">
      <el-input v-model="info.phone" type="phone"></el-input>
      <p style="color: red; margin: 0">{{ phoneError }}</p>
    </el-form-item>
    <el-form-item label="Address" prop="address">
      <el-input v-model="info.address" type="address"></el-input>
      <p style="color: red; margin: 0">{{ addressError }}</p>
    </el-form-item>

    <el-form-item>
      <el-button @click="submit('info')" type="primary">Submit</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import store from "../../store/store";

export default {
  name: "OrderForm",
  data() {
    return {
      store,
      info: {
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
      },
      rules: {
        firstName: [
          {
            type: "string",
            required: true,
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            type: "string",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            type: "number",
            trigger: "blur",
          },
        ],
        address: [
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
      this.firstNameError = "";
      this.lastNameError = "";
      this.phoneError = "";
      this.addressError = "";
    },

    submit(info) {
      //this.clearErrors();
      console.log(info);
      let userInfo = {
        firstName: this.info.firstName,
        lastName: this.info.lastName,
        phone: this.info.phone,
        address: this.info.address,
      };
        this.$refs[info].validate().then(() => {
        store
          .dispatch("auth/login", user)
          .then((res) => {
            if (res.data.user.role_id == 1) {
              this.$router.push("/dashboard");
            } else {
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
.form {
  width: 300px;
}
</style>