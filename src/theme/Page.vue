<template>
  <div id="vwp-single">
    <div v-if="single.content">
      <h1 v-html="single.title.rendered"></h1>
      <div class="single-content card" v-html="single.content.rendered"></div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageComponent',
  data: () => {
    return { 
      slug: "",
      single: {}
    }
  },
  computed: {
    ...mapGetters([
      'routeParamId'
    ])
  },
  created () {
    this.slug = this.routeParamId;
    require.ensure('../app.service.js', () => {
      let wordpressService = require('../app.service.js')
      wordpressService.default.getPage(this, null, this.slug).then((page) => {
        if(page.length > 0){
          this.single = page[0];
        }
      })
    })
  }
}
</script>

<style lang="scss">
  #vwp-single .single-content{
    background-color: #ffffff;
    padding:20px;
    display:inline-block;
    width:100%;
  }
</style>
