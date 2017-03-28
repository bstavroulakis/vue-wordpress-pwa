<template>
  <section id="ThemeCategory">
    <div class="columns personal-card card" v-if="categories && categories.length === 1 && categories[0].slug === 'blog'">
      <div class="column personal-img"><img src="https://api.fullstackweekly.com/wp-content/uploads/2016/11/200x200.jpg" alt="Bill Stavroulakis" width="100"></div>
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
import VwpSubcategory from '../components/vwpSubcategory.vue'
const fetchInitialData = (store) => {
  let categories = store.state.category.categories
  let page = store.state.category.page
  if (((store.state.route.params.page && page !== store.state.route.params.page) ||
  categories.length !== 1 ||
  categories[0].slug !== store.state.route.params.id)) {
    store.state.category.categories = []
    return store.dispatch(`category/getCategory`, {categorySlug: store.state.route.params.id, page: store.state.route.params.page})
  }
}
export default {
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
    })
  },
  watch: {
    routeParamId: function (newParamId) {
      if (newParamId) {
        this.getCategory({categorySlug: newParamId})
      }
    },
    routeParamPage: function (newParamPage) {
      if (newParamPage) {
        this.getCategory({page: newParamPage})
      }
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
    fetchInitialData(this.$store)
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
