<template>
  <div class="container flex justify-center items-center" @click="close">
    <slot></slot>
  </div>
</template>
<script>
export default {
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
