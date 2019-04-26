<template
  ><div></div
></template>
<script>
  export default {
    name: "ga-analytics",
    props: ["ua"],
    watch: {
      $route(to, from) {
        this.updateGa();
      }
    },
    methods: {
      updateGa() {
        if (window.ga) {
          window.ga("set", "page", window.location.pathname);
          window.ga("send", "pageview");
        }
      }
    }
  };
</script>
