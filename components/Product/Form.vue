<script setup>
const props=defineProps(['productDialog']);
console.log(props.productDialog);
const product = ref({});
const productDialogg=ref(true);
const statuses = ref([
  { label: "INSTOCK", value: "instock" },
  { label: "LOWSTOCK", value: "lowstock" },
  { label: "OUTOFSTOCK", value: "outofstock" },
]);
</script>
<template>

  <Dialog
  @hide="$emit('toggleProductDialog')"
   v-if="productDialog"
    v-model:visible="productDialogg"
    :style="{ width: '450px' }"
    header="Product Details"
    :modal="true"
    class="p-fluid"
  >
    <ProductForm></ProductForm>

    <img
      v-if="product.image"
      :src="'/demo/images/product/' + product.image"
      :alt="product.image"
      width="150"
      class="mt-0 mx-auto mb-5 block shadow-2"
    />
    <div class="field">
      <label for="name">Name</label>
      <InputText
        id="name"
        v-model.trim="product.name"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !product.name }"
      />
      <small v-if="submitted && !product.name" class="p-invalid"
        >Name is required.</small
      >
    </div>
    <div class="field">
      <label for="description">Description</label>
      <Textarea
        id="description"
        v-model="product.description"
        required="true"
        rows="3"
        cols="20"
      />
    </div>

    <div class="field">
      <label for="inventoryStatus" class="mb-3">Inventory Status</label>
      <Dropdown
        id="inventoryStatus"
        v-model="product.inventoryStatus"
        :options="statuses"
        optionLabel="label"
        placeholder="Select a Status"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value && slotProps.value.value">
            <span :class="'product-badge status-' + slotProps.value.value">{{
              slotProps.value.label
            }}</span>
          </div>
          <div v-else-if="slotProps.value && !slotProps.value.value">
            <span
              :class="'product-badge status-' + slotProps.value.toLowerCase()"
              >{{ slotProps.value }}</span
            >
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
      </Dropdown>
    </div>

    <div class="field">
      <label class="mb-3">Category</label>
      <div class="formgrid grid">
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category1"
            v-model="product.category"
            name="category"
            value="Accessories"
          />
          <label for="category1">Accessories</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category2"
            v-model="product.category"
            name="category"
            value="Clothing"
          />
          <label for="category2">Clothing</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category3"
            v-model="product.category"
            name="category"
            value="Electronics"
          />
          <label for="category3">Electronics</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category4"
            v-model="product.category"
            name="category"
            value="Fitness"
          />
          <label for="category4">Fitness</label>
        </div>
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col">
        <label for="price">Price</label>
        <InputNumber
          id="price"
          v-model="product.price"
          mode="currency"
          currency="USD"
          locale="en-US"
          :class="{ 'p-invalid': submitted && !product.price }"
          :required="true"
        />
        <small v-if="submitted && !product.price" class="p-invalid"
          >Price is required.</small
        >
      </div>
      <div class="field col">
        <label for="quantity">Quantity</label>
        <InputNumber id="quantity" v-model="product.quantity" integeronly />
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="saveProduct"
      />
    </template>
  </Dialog>
</template>
