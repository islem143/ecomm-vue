
<template>

    <Card >
      <template v-slot:title> Confirmation </template>
      <template v-slot:content>
        
            <div class="field col-12">
              <label for="class">Full Name </label>
               <b>{{ formData.firstname }}</b>
            </div>
            <div class="field col-12">
              <label for="LastName">Last Name</label>
              <b>{{ formData.lastname }}</b>
            </div>

            <div class="field col-12">
              <label for="city">City</label>
              <b>{{ formData.city }}</b>
            </div>
            <div class="field col-12">
              <label for="address">Address 1</label>
              <b>{{ formData.address1 }}</b>
            </div>
            <div class="field col-12">
              <label for="zip">Zip Code</label>
              <b>{{ formData.zipCode }}</b>
            </div>
            <div class="field col-12">
              <label for="card Number">Card Number</label>
              <b>{{ formData.last4 }}</b>
            </div>
          
       
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
          <Button
            label="Order"
            @click="complete()"
            icon="pi pi-check"
            iconPos="right"
            class="p-button-success"
          />
        </div>
      </template>
    </Card>
   

</template>

<script>
export default {
  props: {
    formData: Object,
  },
  methods: {
    prevPage() {
      this.$emit("prev-page", { pageIndex: 2 });
    },
    complete() {
      this.$emit("complete");
    },
  },
};
</script>
