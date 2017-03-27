<template>
  <div id="vwp-single">
    <div v-if="!single || (single && !single.content)">
      <h1>Loading Page...</h1>
      <div class="single-content card fake-single-content"></div>
    </div>
    <div v-if="single && single.content">
      <h1 v-html="single.title.rendered"></h1>
      <div class="single-content card" v-html="single.content.rendered"></div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const fetchInitialData = (store) => {
  store.state.page.single = {}
  return store.dispatch(`page/getPage`, store.state.route.params.id)
}
export default {
  computed: {
    ...mapGetters([
      'routeParamId'
    ]),
    ...mapGetters('page', [
      'single'
    ])
  },
  methods: {
    ...mapActions('page', {
      getPage: 'getPage'
    })
  },
  watch: {
    routeParamId: function (newParamId) {
      if (newParamId) {
        this.getPage(newParamId)
      }
    }
  },
  prefetch: fetchInitialData,
  created () {
    if (!this.single || !this.single.slug || this.single.slug !== this.routeParamId) {
      fetchInitialData(this.$store)
    }
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
