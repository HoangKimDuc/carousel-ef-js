<template>
  <div ref="container"></div>
</template>

<script>
import Carousel from "../index"
export default {
  data: () => ({
    list: [
      {
        id: 1,
        color: "red",
        img: "/images/img1.jpg",
        type: "type1"
      },
      {
        id: 2,
        color: "yellow",
        img: "/images/img2.jpg",
        type: "type2"
      },
      {
        id: 3,
        color: "black",
        img: "/images/img3.jpg",
        type: "type3"
      },
      {
        id: 4,
        color: "black",
        img: "/images/img4.jpg",
        type: "type4"
      },
      {
        id: 5,
        color: "black",
        img: "/images/img5.jpg",
        type: "type5"
      },
    ],
    container: null,
  }),
  mounted() {
    console.log("Vo component!")
    this.container = new Carousel(this.$refs.container, this.list)
    this.container.render()
  }
}
</script>

<style>
</style>