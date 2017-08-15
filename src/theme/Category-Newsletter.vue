<template>
  <div>
    <app-newsletter id="vwp-category-app-newsletter"></app-newsletter>
    <div>
      <p>Full Stack Weekly is free weekly newsletter for full stack developers. Every Thursday. I do not share your email and keep it safe! No spam, promise!</p>
      <p>This newsletter is all of the links and material that raise my eyebrow each week as a full stack developer.</p>
    </div>
    <div class="columns"><div class="column"></div></div>
    <vwp-subcategory hidePagination="true" newFlag="true"></vwp-subcategory>
  </div>
</template>
<script>
import AppNewsletter from './AppNewsletter.vue'
import { mapGetters, mapActions } from 'vuex'
import VwpSubcategory from 'components/vwpSubcategory.vue'
const fetchInitialData = (store) => {
  store.state.category.categories = []
  return store.dispatch(`category/getCategory`, {parentId: 28})
}
export default {
  name: 'ThemePageCategoryNewsletter',
  components: {
    'app-newsletter': AppNewsletter,
    'vwp-subcategory': VwpSubcategory
  },
  methods: {
    ...mapActions('category', {
      getCategory: 'getCategory'
    })
  },
  computed: {
    ...mapGetters([
      'routeParamId'
    ]),
    ...mapGetters('category', [
      'categories'
    ])
  },
  watch: {
    routeParamId: function (newParamId) {
      if (this.categories && this.categories.length <= 1) {
        this.getCategory({categorySlug: newParamId})
      }
    }
  },
  prefetch: fetchInitialData,
  created () {
    if (this.categories && this.categories.length <= 1) {
      fetchInitialData(this.$store)
    }
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
