<template>
  <div>
    <app-newsletter id="vwp-category-app-newsletter"></app-newsletter>
    <div>
      <p>Full Stack Weekly is free weekly newsletter for full stack developers. Every Thursday. I do not share your email and keep it safe! No spam, promise!</p>
      <p>This newsletter is all of the links and material that raise my eyebrow each week as a full stack developer.</p>
    </div>
    <div class="columns"><div class="column"></div></div>
    <div class="columns category-posts" v-if="!categories || categories.length === 0">
      <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
      <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
      <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
    </div>
    <vwp-subcategory :categories="categories" hidePagination="true" newFlag="true"></vwp-subcategory>
  </div>
</template>
<script>
import AppNewsletter from './AppNewsletter.vue'
import { mapGetters, mapActions } from 'vuex'
import VwpSubcategory from 'components/vwpSubcategory.vue'
const fetchInitialData = (store, route) => {
  route.params.page = route.params.page || 1
  return store.dispatch(`category/getCategory`, {parentId: 28})
}
export default {
  name: 'ThemePageCategoryNewsletter',
  components: {
    'app-newsletter': AppNewsletter,
    'vwp-subcategory': VwpSubcategory
  },
  computed: {
    ...mapGetters('category', [
      'categories'
    ])
  },
  methods: {
    ...mapActions('category', {
      getCategory: 'getCategory'
    }),
    loadData () {
      fetchInitialData(this.$store, this.$route)
    }
  },
  watch: {
    '$route' (to, from) {
      this.loadData()
    }
  },
  prefetch: fetchInitialData,
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="scss">
  #vwp-category-app-newsletter{
    border-bottom: 1px solid #cfcfcf;
    margin-bottom: 30px;
     .hero-body{
      padding-top: 0;
      padding-bottom:0;
     }
     .subtitle{
       display: none;
     }
     p.title{
      font-size: 180%;
     }
  }
  .category-posts{
    flex-wrap:wrap;
  }
</style>
