<template>
  
  <div id="vwp-subcategory">
    <div class="vwp-loading" v-if="loading">
        <img alt="loading" src="../assets/loading.gif" />
    </div>
    <div class="columns category-posts">
      <div class="column is-one-third" v-for="(item, index) in posts">
        <vwp-post-card :post="item" :newFlag="newFlag" :category="category"></vwp-post-card>
      </div>
    </div>
    <div v-if="!hidePagination">
      <div class="columns"><div class="column"></div></div>
      <vwp-paging v-if="totalPages > 0" :totalPages="totalPages" :path="'/category/' + category.slug"></vwp-paging>
    </div>
  
  </div>
  
</template>

<script>
let wordpressService;
import { mapGetters } from 'vuex'
export default {
  name: 'vwp-subcategory',
  components: { 
    'vwp-post-card': require('./vwpPostCard.vue'), 
    'vwp-paging': require('./vwpPaging.vue')
  },
  props: ['category', 'hidePagination', 'newFlag'],
  computed: {
    ...mapGetters([
      'blogPagingPage'
    ])
  },
  data: () => {
    return {
      posts: [],
      totalPages: 0,
      loading: true
    }
  },
  watch: {
    blogPagingPage : function(newPageNum){
      if(!newPageNum){
        newPageNum = 1;
      }
      this.refreshPages(newPageNum, this.category.id);
    },
    category: function(newCategory){
      if(newCategory && newCategory.id){
        this.refreshPages(1, newCategory.id);
      }
    }
  },
  methods:{
    refreshPages: function (newPageNum, categoryId){
      if(!newPageNum){
        newPageNum = 1;
      }
      newPageNum = parseInt(newPageNum);
      this.posts = [];
      this.totalPages = 0;
      wordpressService.getPosts(this, categoryId, newPageNum, 6)
      .then((result) => {
        this.posts = result.posts;
        this.totalPages = result.totalPages;
        this.loading = false;
      })
    }
  },
  created (){
    require.ensure('../app.service.js', () => {
      wordpressService = require('../app.service.js').default;
      this.refreshPages(this.blogPagingPage, this.category.id);
    });
  }
}
</script>