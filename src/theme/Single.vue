<template>
  <div>
    <div v-if="(single && !single.content)">
        <h1>Loading...</h1>
        <div class="single-content card fake-single-content"></div>
    </div>
    <vwp-single :single="single"></vwp-single>
    <vwp-comment></vwp-comment>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VwpSingle from '../components/vwpSingle.vue'
import VwpComment from '../components/vwpComment.vue'
const fetchInitialData = (store) => {
  store.state.category.single = {}
  return store.dispatch(`category/getPost`, store.state.route.params.id)
}
export default {
  name: 'SingleComponent',
  components: {
    'vwp-single': VwpSingle,
    'vwp-comment': VwpComment
  },
  computed: {
    ...mapGetters([
      'routeParamId'
    ]),
    ...mapGetters('category', [
      'single'
    ])
  },
  methods: {
    ...mapActions('category', {
      getPost: 'getPost'
    })
  },
  watch: {
    routeParamId: function (newParamId) {
      if (newParamId) {
        this.getPost(newParamId)
      }
    }
  },
  prefetch: fetchInitialData,
  created () {
    if (!this.single || !this.single.slug || (this.single.slug !== this.routeParamId)) {
      fetchInitialData(this.$store)
    }
  }
}
</script>
