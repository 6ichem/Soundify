<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");

body {
  background-color: rgb(17, 12, 76);
  font-family: "Nanum Gothic", sans-serif;
}
</style>
