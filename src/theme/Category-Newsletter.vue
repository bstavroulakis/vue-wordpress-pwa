<template>
  <section id="vwp-category-newsletter">
    <app-newsletter id="vwp-category-app-newsletter"></app-newsletter>
    <div>
      <p>Full Stack Weekly is free weekly newsletter for full stack developers. Every Thursday. I do not share your email and keep it safe! No spam, promise!</p>
      <p>My name is <a href="https://twitter.com/bstavroulakis">Bill</a> and I'm in the eternal pursuit of finding the next shiny thing. I love to read articles and learn new technologies. This newsletter is all of the links and material that raise my eyebrow each week as a full stack developer.</p>
    </div>
    <div class="columns"></div><div class="column"></div></div>
    <div class="columns">
      <div class="column is-three-quarters">
        <div class="columns" v-for="(item, index) in subCategories">
          <div class="column">
            <h2>
                <router-link :to="'/category/' + item.slug + '/'">{{item.name}}</router-link>
            </h2>
            <div class="columns"><div class="column"></div></div>
            <vwpSubcategory class="columns category-posts" hidePagination="hidePagination" :category="item"></vwpSubcategory>
            <div class="columns"><div class="column"></div></div>
          </div>
        </div>
      </div>
      <div class="column">
        <div id="category-newsletter-twitter-feed"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { twttr } from '../components/twitter.js'
import { mapGetters } from 'vuex'
import wordpressService from '../app.service.js'
import vwpSubcategory from '../components/vwpSubcategory.vue'
import AppNewsletter from './shared/AppNewsletter.vue'
export default {
  name: 'ThemeCategoryNewsletter',
  components: { vwpSubcategory, AppNewsletter },
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
    },
    loadTwitter(){
      window.twttr.widgets.createTimeline(
      {
        sourceType: 'profile',
        screenName: 'fullstacknews'
      },
      document.getElementById('category-newsletter-twitter-feed'),
      {
        chrome: 'nofooter',
        linkColor: '#287ab1',
        showReplies: true
      })
    }
  },
  computed: {
    ...mapGetters([
      'routeParamId',
      'routeMetaId'
    ])
  },
  mounted(){
    let self = this;
    require.ensure('../components/twitter.js', () => {
      window.twttr.ready(
        function (twttr) {
          self.loadTwitter();
        }
      );
    })

  },
  created () {
    if(this.routeMetaId){
      this.categoryId = this.routeMetaId;
      this.loadSubcategories();
    }else{
      wordpressService.getCategory(this, null, this.routeParamId).then((category) => {
        this.categoryId = category[0].id;
        this.loadSubcategories();
      })
    };
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
