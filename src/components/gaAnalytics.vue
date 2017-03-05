<template></template>
<script>

import { mapGetters } from 'vuex'
import loadScript from '../utils/loadScript.js'
export default {
  name:'ga-analytics',
  props: ['ua'],
  computed: {
    ...mapGetters([
      'routeParams'
    ])
  },
  watch: {
    routeParams : function(){
      if(window.ga){
        window.ga('set', 'page', window.location.pathname);
        window.ga('send', 'pageview');
      }
    }
  },
  created(){
    var self = this;
    require.ensure(['../app.config.js'], () => {
      let config = require('../app.config.js');
      loadScript(config.analyticsPath, () => {
          window.ga=window.ga||function(){
            (ga.q=ga.q||[]).push(arguments)
          };
          window.ga.l=+new Date;
          window.ga('create', self.ua, 'auto');
          window.ga('send', 'pageview');
      })
    });
  }
}
</script>