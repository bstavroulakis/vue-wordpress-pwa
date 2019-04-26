<template
  ><div></div
></template>
<script>
  export default {
    beforeMount() {
      this.$router.push(this.$route.hash.replace("#", ""));
    }
  };
</script>
