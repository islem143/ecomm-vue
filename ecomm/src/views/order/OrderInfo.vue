
<template>

     
        <Card class="p-5">
          <template v-slot:title> Shipping Address</template>
          <template v-slot:subtitle> Enter your personal information </template>
          <template v-slot:content>
            <div class="grid p-4">
              <div class="col-6">
                <div class="p-fluid">
                  <div class="field">
                    <label for="firstname">First Name</label>
                    <InputText
                      id="firstname"
                      v-model="v$.info.firstname.$model"
                      :class="{
                        'p-invalid': v$.info.firstname.$error,
                      }"
                    />
                    <small class="p-error">{{ firstnameError }}</small>
                    <span v-if="v$.info.firstname.$error">
                      <small
                        :key="error.$uid"
                        v-for="error of v$.info.firstname.$errors"
                        class="p-error"
                        >{{ error.$message }}</small
                      >
                    </span>
                  </div>
                  <div class="field">
                    <label for="lastname">Last Name</label>
                    <InputText
                      id="lastname"
                      v-model="v$.info.lastname.$model"
                      :class="{
                        'p-invalid': v$.info.lastname.$error,
                      }"
                    />
                    <small class="p-error">{{ lastnameError }}</small>
                    <span v-if="v$.info.lastname.$error">
                      <small
                        :key="error.$uid"
                        v-for="error of v$.info.lastname.$errors"
                        class="p-error"
                        >{{ error.$message }}</small
                      >
                    </span>
                  </div>
                  <div class="field">
                    <label for="city">City</label>
                    <InputText
                      id="city"
                      v-model="v$.info.city.$model"
                      :class="{
                        'p-invalid': v$.info.city.$error,
                      }"
                    />
                    <small class="p-error">{{ cityError }}</small>
                    <span v-if="v$.info.city.$error">
                      <small
                        :key="error.$uid"
                        v-for="error of v$.info.city.$errors"
                        class="p-error"
                        >{{ error.$message }}</small
                      >
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="p-fluid">
                  <div class="field">
                    <label for="zipCode">Zip Code </label>
                    <InputText
                      id="zipCode"
                      v-model="v$.info.zipCode.$model"
                      :class="{
                        'p-invalid': v$.info.zipCode.$error,
                      }"
                    />
                    <small class="p-error">{{ zipCodeError }}</small>
                    <span v-if="v$.info.zipCode.$error">
                      <small
                        :key="error.$uid"
                        v-for="error of v$.info.zipCode.$errors"
                        class="p-error"
                        >{{ error.$message }}</small
                      >
                    </span>
                  </div>
                  <div class="field">
                    <label for="address1">Address</label>
                    <InputText
                      id="address1"
                      v-model="v$.info.address1.$model"
                      :class="{
                        'p-invalid': v$.info.address1.$error,
                      }"
                    />
                    <small class="p-error">{{ address1Error }}</small>
                    <span v-if="v$.info.address1.$error">
                      <small
                        :key="error.$uid"
                        v-for="error of v$.info.address1.$errors"
                        class="p-error"
                        >{{ error.$message }}</small
                      >
                    </span>
                  </div>
                  <div class="field">
                    <label for="state">State</label>
                    <InputText
                      id="state"
                      v-model="v$.info.state.$model"
                      :class="{
                        'p-invalid': v$.info.state.$error,
                      }"
                    />
                    <small class="p-error">{{ stateError }}</small>
                    <span v-if="v$.info.state.$error">
                      <small
                        :key="error.$uid"
                        v-for="error of v$.info.state.$errors"
                        class="p-error"
                        >{{ error.$message }}</small
                      >
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:footer>
            <div class="grid grid-nogutter justify-content-between">
              <i></i>
              <Button
                label="Next"
                @click="nextPage()"
                icon="pi pi-angle-right"
                iconPos="right"
              />
            </div>
          </template>
        </Card>
     
   
    
   

</template>

<script>
import { required, integer } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import store from "../../store/store";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      info: {
        lastname: "",
        firstname: "",
        city: "",
        zipCode: "",
        address1: "",
        state:""
      },

      lastnameError: "",
      firstnameError: "",
      cityError: "",
      stateError:'',
      zipcodeError: "",
      address1Error: "",
      error: "",
      submitted: false,
      validationErrors: {},
    };
  },
 
  validations() {
    return {
      info: {
        firstname: { required },
        lastname: { required },
        city: { required },
        zipCode: { required,integer },
        address1: { required },
        state: { required },
      },
    };
  },
  methods: {
    clearErrors() {
      this.lastnameError = "";
      this.passwordError = "";
      this.nameError = "";
      this.firstnameError = "";
      this.cityError = "";
      this.zipcodeError = "";
      this.address1Error = "";
      this.stateError=""
    },
    async nextPage() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }
      this.clearErrors();
      this.submitted = true;

      this.$emit("next-page", {
        formData: {
          firstname: this.info.firstname,
          lastname: this.info.lastname,
          city: this.info.city,
          zipCode: this.info.zipCode,
          address1: this.info.address1,
          state:this.info.state
        },
        pageIndex: 0,
      });
    },
  },
};
</script>
