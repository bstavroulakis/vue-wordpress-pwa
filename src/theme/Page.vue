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
const fetchInitialData = (store, route) => {
  store.state.page.single = {}
  return store.dispatch(`page/getPage`, route.params.id)
}
export default {
  computed: {
    ...mapGetters('page', [
      'single'
    ])
  },
  methods: {
    ...mapActions('page', {
      getPage: 'getPage'
    }),
    loadData () {
      fetchInitialData(this.$store, this.$route)
    }
  },
  watch: {
    '$route' (to, from) {
      this.loadDate()
    }
  },
  prefetch: fetchInitialData,
  created () {
    if (!this.single || !this.single.slug || this.single.slug) {
      fetchInitialData(this.$store, this.$route)
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
