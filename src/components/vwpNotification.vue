<template>
  <div id="vwp-notification">

  </div>
</template>
<script>
  export default {
    name: 'vwp-notification'
  }
</script>
<style>
  #vwp-notification{
    position: fixed;
    top:10px;
    right:10px;
    width:300px;
    z-index:3;
  }
  #vwp-notification .hidden{
    display: none;
  }
</style>
