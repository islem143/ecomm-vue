<template>
  <el-dialog v-model="dialogVisible" :title="title" width="25%">
    <slot></slot>
    <span class="dialog-footer">
      <el-button @click="close">Cancel</el-button>

    </span>
  </el-dialog>
</template>



<script>
export default {
  name: "Dialog",
  props: {
    dialogVisible: Boolean,
    title: String,
  },

  methods: {
    
    close() {
      this.$emit("close");
    },
  },
};
</script>