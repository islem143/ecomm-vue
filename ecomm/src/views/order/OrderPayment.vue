
<template>
  <Card class="p-5">
    <template v-slot:title> Payment Information</template>
    <template v-slot:subtitle> Enter your personal information </template>
    <template v-slot:content>
      <div class="grid p-4">
        <div class="col-12">
          <div class="p-fluid">
            <div id="card-element"></div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="grid grid-nogutter justify-content-between">
        <i></i>
        <Button
          :disabled="processing"
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
import store from "../../store/store";
import { loadStripe } from "@stripe/stripe-js";
export default {
  props: ["formData"],

  data() {
    return {
      stripe: {},
      cardElement: {},
      processing: false,
    };
  },

  async mounted() {
    this.stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    const elements = this.stripe.elements();

    this.cardElement = elements.create("card", {
      classes: {
        base: "surface-100 p-3 border-round border-1 font-bold",
      },
    });
    this.cardElement.mount("#card-element");
  },
  methods: {
    async nextPage() {
      this.processing = true;
      console.log(this.cardElement);
      const { paymentMethod, error } = await this.stripe.createPaymentMethod(
        "card",
        this.cardElement,
        {
          billing_details: {
            name: this.formData.firstname + " " + this.formData.lastname,
            address: {
              line1: this.formData.address,
              city: this.formData.city,
              state: this.formData.state,
              postal_code: this.formData.zipCode,
            },
          },
        }
      );
      if (error) {
        console.log(error);
        return;
      }
      this.processing = false;
      this.submitted = true;

      this.$emit("next-page", {
        formData: {
          paymentMethodId: paymentMethod.id,
          last4: paymentMethod.card.last4,
        },
        pageIndex: 1,
      });
    },
  },
};
</script>
