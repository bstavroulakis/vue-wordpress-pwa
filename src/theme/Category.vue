<template>
  <section id="ThemeCategory">
    <div class="columns personal-card card" v-if="categories && categories.length === 1 && categories[0].slug === 'blog'">
      <div class="column personal-img"><img src="https://fullstackweekly.azureedge.net/wp-content/uploads/2017/03/bill-100x100.jpg" alt="Bill Stavroulakis" width="100"></div>
      <div class="column is-three-quarters personal-desc">
        Hi, I’m <a href="https://twitter.com/bstavroulakis" rel="noopener" target="_blank">Bill Stavroulakis</a>, many years ago my journey started on this thing called Web Development.<br/><br/>
        <span class="is-pulled-left">Over here you can find all of the interesting things I find on my way.&nbsp;</span>
        <span class="is-pulled-left">This website is part of the <a href="https://github.com/bstavroulakis/vue-wordpress-pwa">vue-wordpress-pwa</a> project.</span>
        <div class="is-clearfix"></div>
      </div>
    </div>
    <vwp-subcategory></vwp-subcategory>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VwpSubcategory from 'components/vwpSubcategory.vue'
const fetchInitialData = (store, route) => {
  return store.dispatch(`category/getCategory`, {categorySlug: route.params.id, page: route.params.page})
}
export default {
  asyncData (store, route) {
    return fetchInitialData(store, route)
  },
  name: 'ThemePageCategory',
  components: {
    'vwp-subcategory': VwpSubcategory
  },
  data: () => {
    return {
      firstRun: true
    }
  },
  methods: {
    ...mapActions('category', {
      getCategory: 'getCategory'
    }),
    loadPosts () {
      fetchInitialData(this.$store, this.$route)
    }
  },
  watch: {
    '$route' (to, from) {
      this.loadPosts()
    }
  },
  computed: {
    ...mapGetters([
      'routeParamId',
      'routeParamPage'
    ]),
    ...mapGetters('category', [
      'categories'
    ])
  },
  prefetch: fetchInitialData,
  created () {
    this.loadPosts()
  }
}
</script>

<style lang="scss">
  #ThemeCategory{
    .personal-card{
      background-color: #ffffff;
      margin-right: 0;
      margin-left: 0;
      .github-star{
        float:left;
        margin-left:10px;
        margin-top:3px;
      }
      .personal-img{
        text-align: center;
        align-self: center;
        margin-bottom:0;
      }
      .personal-desc{
        align-self: center;
      }
    }
    .category-posts{
      flex-wrap:wrap;
    }
   .hero-body{
      padding-top: 0;
    }
  }
</style>
