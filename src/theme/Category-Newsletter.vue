<template>
  <section id="vwp-category-newsletter">
    <app-newsletter id="vwp-category-app-newsletter"></app-newsletter>
    <div>
      <p>Full Stack Weekly is free weekly newsletter for full stack developers. Every Thursday. I do not share your email and keep it safe! No spam, promise!</p>
      <p>This newsletter is all of the links and material that raise my eyebrow each week as a full stack developer.</p>
    </div>
    <div class="columns"></div><div class="column"></div></div>
    <div class="columns" v-for="(item, index) in subCategories">
      <div class="column">
        <h2>
            <router-link :to="'/category/' + item.slug + '/'">{{item.name}}</router-link>
        </h2>
        <div class="columns"><div class="column"></div></div>
        <vwp-subcategory class="columns category-posts" hidePagination="hidePagination" newFlag="true" :category="item"></vwp-subcategory>
        <div class="columns"><div class="column"></div></div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
let wordpressService;
export default {
  name: 'ThemeCategoryNewsletter',
  components: { 
    'vwp-subcategory': require('../components/vwpSubcategory.vue'), 
    'app-newsletter': require('./shared/AppNewsletter.vue') 
  },
  data: () => {
    return { 
      categoryId: 0,
      subCategories: []
    }
  },
  methods:{
    loadSubcategories (){
      wordpressService.getCategoryChildren(this, this.categoryId).then((categories) => {
          this.subCategories = categories;
        })
    }
  },
  computed: {
    ...mapGetters([
      'routeParamId',
      'routeMetaId'
    ])
  },
  created () {
    var self = this;
    require.ensure('../app.service.js', function(){
      wordpressService = require('../app.service.js').default;
      if(self.routeMetaId){
        self.categoryId = self.routeMetaId;
        self.loadSubcategories();
      }else{
        wordpressService.getCategory(self, null, self.routeParamId).then((category) => {
          self.categoryId = category[0].id;
          self.loadSubcategories();
        })
      };
    })
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
