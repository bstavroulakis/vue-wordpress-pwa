<template>
  <div>
    <div v-if="loading">
        <h1>Loading...</h1>
        <div class="single-content card fake-single-content"></div>
    </div>
    <vwp-single  v-if="!loading" :single="single"></vwp-single>
    <vwp-comment></vwp-comment>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SingleComponent',
  components: { 
    'vwp-single': require('../components/vwpSingle.vue'), 
    'vwp-comment': require('../components/vwpComment.vue')
  },
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
    this.slug = this.routeParamId;
    
    let self = this;
    require.ensure(['../app.service.js'], function(){
      let wordpressService  = require('../app.service.js').default
      wordpressService.getPost(self, null, self.slug).then((post) => {
        if(post.length != 0){
          self.single = post[0];
        }
        self.loading = false;
      })
    });
  }
}
</script>
