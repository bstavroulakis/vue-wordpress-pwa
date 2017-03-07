<template>
  <div>
    <div class="columns">
      <div class="column is-three-quarters">
        <div class="vwp-loading" v-if="loading">
            <img alt="loading" src="../assets/loading.gif" />
        </div>

        <div v-if="getPrev(single.id)" class="is-pulled-left">
          <router-link :to="'./' + getPrev(single.id)" class="button">
            <span class="icon">
              <i class="icon-left-big"></i>
            </span>
            <span>Previous</span>
          </router-link>
        </div>
        <div v-if="getNext(single.id)" class="is-pulled-right">
         <router-link :to="'./' + getNext(single.id)" class="button">
          <span class="icon">
            <i class="icon-right-big"></i>
          </span>
          <span>Next</span>
        </router-link>
        </div>
        <div class="is-clearfix"></div>
        
        <vwp-single :single="single"></vwp-single>
      </div>
      <div class="column is-one-quarter">
      <aside class="menu">
        <p class="menu-label">
          Table of Contents
        </p>
        <ul class="menu-list">
          <li v-for="(item, index) in posts">
            <router-link :to="'./' + item.slug" v-html="item.title.rendered" ></router-link>
          </li>
        </ul>
      </aside>
      </div>
    </div>
    <vwp-comment></vwp-comment>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
let wordpressService;

export default {
  name: 'ThemeSingleLearningPaths',
  components: { 
    'vwp-single': require('../components/vwpSingle.vue'), 
    'vwp-comment': require('../components/vwpComment.vue')
  },
  data: () => {
    return { 
      posts: [],
      page: 1,
      single: {},
      categoryId:0,
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'routeParams',
      'routeParamPost'
    ])
  },
  watch: {
    routeParamPost : function(newPost){
      if(newPost){
        this.updatePost(newPost);
      }
    }
  },
  methods: {
    getPrev: function(){
      var self = this;
      for(var i = 0; i < self.posts.length; i++){
        if(i > 0 && self.posts[i].id == self.single.id){
          return self.posts[i-1].slug;
        }
      }
    },
    getNext: function(){
      var self = this;
      var postLength = self.posts.length;
      for(var i = 0; i < postLength; i++){
        if(i < postLength - 1 && self.posts[i].id == self.single.id){
          return self.posts[i+1].slug;
        }
      }
    },
    updateMenu: function(categoryId){
      if(this.categoryId == categoryId){return;}
      wordpressService.getPosts(this, categoryId, this.page , 50, 'asc').then((data) => {
        this.posts = data.posts;
        if(!this.routeParams.post){
          require.ensure('../app.service.js', () => {
            let router = require('../components/router');
            router.default.replace(this.posts[0].slug);
          });
        }
      })
    },
    updatePost: function(postId){
      this.single = {};
      this.loading = true;
      wordpressService.getPost(this, null, postId).then((post) => {
        this.loading = false;
        let self = this;
        if(post && post.length > 0){
          this.single = post[0];
          let categoryId = self.single.pure_taxonomies.categories.map(function(v){
              if(v.slug == self.routeParams.category){
                return v.term_id;
              }
          });
          this.updateMenu(categoryId);
        }
      });
    }
  },
  created(){
    require.ensure('../app.service.js', () => {
      wordpressService = require('../app.service.js').default;
      if(!this.routeParams.post){
        wordpressService.getCategory(this, null, this.routeParams.category).then((data) => {
          this.updateMenu(data[0].id);
        })
      }else {
        this.updatePost(this.routeParams.post);
      }
    });
  }
}
</script>