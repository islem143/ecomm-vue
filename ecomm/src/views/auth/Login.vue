<template>
  <div class="flex align-items-center flex-column pt-6 px-3">
    <Card class="p-5 w-4">
      <template #content>
        <h4 class="text-center">Login</h4>
        <div class="field">
          <InputText
            :class="{ 'p-invalid': v$.info.email.$error }"
            v-model="v$.info.email.$model"
            placeholder="Email"
            type="email"
          />
           <small class="p-error">{{emailError}}</small>
          <span v-if="v$.info.email.$error">
           
            <small
              :key="error.$uid"
              v-for="error of v$.info.email.$errors"
              class="p-error"
              >{{ error.$message }}</small
            >
          </span>
        </div>
        <div class="field">
          <Password
            :inputClass="{ 'p-invalid': v$.info.password.$error }"
            v-model="v$.info.password.$model"
            inputStyle="width:100%"
            placeholder="Password"
            type="password"
            :feedback="false"
          />
          <small class="p-error">{{passwordError}}</small>
          <span v-if="v$.info.password.$error">
            <small
              :key="error.$uid"
              v-for="error of v$.info.password.$errors"
              class="p-error"
              >{{ error.$message }}</small
            >
          </span>
        </div>
        <Button @click="login">Login</Button>
      </template>
    </Card>
  </div>
</template>

<script>
import store from "../../store/store";
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "Login",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      store,
      info: {
        email: "",
        password: "",
      },

      emailError: "",
      passwordError: "",
      error: "",
    };
  },
  validations() {
    return {
      info: {
        email: { required, email },
        password: { required, minLength: minLength(4) },
      },
    };
  },

  methods: {
    clearErrors() {
      this.emailError = "";
      this.passwordError = "";
      this.nameError = "";
    },

    async login(info) {
      const isFormCorrect = await this.v$.$validate();
       if(!isFormCorrect){
         return
       }
      this.clearErrors();
      let user = {
        email: this.info.email,
        password: this.info.password,
      };

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
          console.log(err);
          for (const key in err.errors) {
            this[key + "Error"] = err.errors[key].toString();
          }
        });
    },
  },
};
</script>

<style scoped>
.p-inputtext {
  width: 100%;
}
.p-password {
  display: block;
}

.field > label {
  display: block;
}
</style>