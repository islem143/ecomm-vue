<template>
  <div class="flex align-items-center flex-column pt-6 px-3">
    <Card class="p-5 w-4">
      <template #content>
        <h4 class="text-center">Register</h4>
        <div class="field">
          <InputText
            :class="{ 'p-invalid': v$.info.email.$error }"
            v-model="v$.info.email.$model"
            placeholder="Email"
            type="email"
          />
          <small class="p-error">{{ emailError }}</small>
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
          <small class="p-error">{{ passwordError }}</small>
          <span v-if="v$.info.password.$error">
            <small
              :key="error.$uid"
              v-for="error of v$.info.password.$errors"
              class="p-error"
              >{{ error.$message }}</small
            >
          </span>
        </div>
        <div class="field">
          <Password
            :inputClass="{ 'p-invalid': v$.info.password_confirmation.$error }"
            v-model="v$.info.password_confirmation.$model"
            inputStyle="width:100%"
            placeholder="Password Confirmation"
            type="password"
            :feedback="false"
          />
       
        </div>
        <Button @click="register">Register</Button>
      </template>
    </Card>
  </div>
</template>

<script>
import axios from "../../http";
import store from "../../store/store";
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "Register",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      store,
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
  validations() {
    return {
      info: {
        email: { required, email },
        password: { required, minLength: minLength(4) },
        password_confirmation:{required}
      },
    };
  },

  methods: {
    clearErrors() {
      this.emailError = "";
      this.passwordError = "";
      this.nameError = "";
    },
    async register(info){
        const isFormCorrect = await this.v$.$validate();
          if(!isFormCorrect){
              return 
          }
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