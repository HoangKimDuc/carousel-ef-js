<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <carousel-ef-js :items="items" :options="options"></carousel-ef-js>
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    options: {
      // duration: .5, // default
      // width: "100%", // default  ("wpx" or "w%")
      // index: 0, // default
    },
    items: [
      {
        img: "/images/img1.jpg",
        type: "type1"
      },
      {
        img: "/images/img2.jpg",
        type: "type2"
      },
      {
        img: "/images/img3.jpg",
        type: "type3"
      },
      {
        img: "/images/img4.jpg",
        type: "type4"
      },
      {
        img: "/images/img5.jpg",
        type: "type5"
      },
    ],
  }),
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
