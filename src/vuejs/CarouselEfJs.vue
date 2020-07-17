<template>
  <div ref="container"></div>
</template>

<script>
import Carousel from "../index"
export default {
  props: {
    items: {
      type: Array,
      require: false,
      default: () => []
    },
    options: {
      type: Object,
      require: false,
      default: () => { }
    },
  },
  data: () => ({
    container: null,
  }),
  mounted() {
    this.container = new Carousel(this.$refs.container, this.items, this.options)
    this.container.render()
  }
}
</script>

<style>
</style>