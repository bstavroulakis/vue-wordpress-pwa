<template>
  <section id="ThemeCategory">
    <div class="columns">
      <div class="column" v-if="category.name">
        <h2>
            {{category.name}}
        </h2>
        <vwpSubcategory v-if="category" :category="category"></vwpSubcategory>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import wordpressService from '../app.service.js'
import vwpSubcategory from '../components/vwpSubcategory.vue'
import AppNewsletter from './shared/AppNewsletter.vue'
export default {
  name: 'ThemeCategory',
  components: { vwpSubcategory, AppNewsletter },
  data: () => {
    return { 
      category: {}
    }
  },
  computed: {
    ...mapGetters([
      'routeParamId',
      'routeParams'
    ])
  },
  watch: {
    routeParamId : function(newCategorySlug){
      this.updateCategory(newCategorySlug);
    }
  },
  methods: {
    updateCategory: function(categorySlug){
      wordpressService.getCategory(this, null, categorySlug).then((category) => {
        if(category && category.length > 0){
          this.category = category[0];
        }
      })
    }
  },
  created () {
    var categorySlug = this.routeParamId;
      if(this.routeParams.category){
        categorySlug = this.routeParams.category
      }
    this.updateCategory(categorySlug);
  }
}
</script>

<style lang="scss">
  #ThemeCategory{
    .category-posts{
      flex-wrap:wrap;
    }
   .hero-body{
      padding-top: 0;
    }
  }
</style>
