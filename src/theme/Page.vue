<template>
  <div id="vwp-single">
    <div v-if="loading">
      <h1>Loading Page...</h1>
      <div class="single-content card"></div>
    </div>
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
      single: {},
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'routeParamId'
    ])
  },
  created () {
    var self = this;
    this.slug = this.routeParamId;
    require.ensure('../app.service.js', () => {
      let wordpressService = require('../app.service.js')
      wordpressService.default.getPage(self, null, self.slug).then((page) => {
        if(page.length > 0){
          self.single = page[0];
        }
        self.loading = false;
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
    min-height:500px;
  }
</style>
