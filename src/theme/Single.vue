<template>
  <div>
    <vwp-single :single="single"></vwp-single>
    <vwp-comment></vwp-comment>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
let VwpSingle = require('../components/vwpSingle.vue')
let VwpComment = require('../components/vwpComment.vue')
export default {
  name: 'SingleComponent',
  components: { VwpSingle, VwpComment },
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
    
    let self = this;
    require.ensure(['../app.service.js'], function(){
      let wordpressService  = require('../app.service.js').default
      wordpressService.getPost(self, null, self.slug).then((post) => {
        if(post.length != 0){
          self.single = post[0];
        }
      })
    });
  }
}
</script>
