<template>
  <div>
    <div class="columns">
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
      <div class="column is-three-quarters">
        <div class="vwp-loading" v-if="loading">
            <img alt="loading" src="../assets/loading.gif" />
        </div>
        <vwp-single :single="single"></vwp-single>
      </div>
    </div>
    <vwp-comment></vwp-comment>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wordpressService from '../app.service'
let VwpSingle = require('../components/vwpSingle.vue')
let VwpComment = require('../components/vwpComment.vue')
let router = require('../components/router')

export default {
  name: 'ThemeSingleLearningPaths',
  components: { VwpSingle, VwpComment },
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
    updateMenu: function(categoryId){
      if(this.categoryId == categoryId){return;}
      wordpressService.getPosts(this, categoryId, this.page , 50, 'asc').then((data) => {
        this.posts = data.posts;
        if(!this.routeParams.post){
          router.default.replace(this.posts[0].slug);
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
    if(!this.routeParams.post){
      wordpressService.getCategory(this, null, this.routeParams.category).then((data) => {
        this.updateMenu(data[0].id);
      })
    }else {
      this.updatePost(this.routeParams.post);
    }
  }
}
</script>