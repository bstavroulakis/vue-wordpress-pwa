<template></template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ga-analytics',
  props: ['ua'],
  computed: {
    ...mapGetters([
      'routeParams'
    ])
  },
  watch: {
    routeParams: function () {
      if (window.ga) {
        window.ga('set', 'page', window.location.pathname)
        window.ga('send', 'pageview')
      }
    }
  }
}
</script>
