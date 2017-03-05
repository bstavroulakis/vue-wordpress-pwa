<template>
  <div id="vwpPaging">
    <div class="paging-wrapper">
      <div class="columns paging-wrapper-inner">
        <div v-for="(item, index) in pages" class="column paging-link">
          <router-link v-if="(item != '...')"  v-bind:class="{ 'is-active': item == page }" :to="path + '/page/' + item + '/'">{{item}}</router-link>
          <div v-if="(item == '...')">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import wordpressService from '../app.service.js'
import { mapGetters } from 'vuex'
export default {
  props: ['totalPages', 'path'],
  data: () => {
    return {
      pages: [],
      neighboors: 2,
      page: 1
    }
  },
  computed: {
    ...mapGetters([
      'blogPagingPage'
    ])
  },
  methods:{
    refreshPages: function (page){
      if(!page){
        page = 1;
      }
      page = parseInt(page);
      this.pages = [];
      for(var i = 1; i <= this.totalPages; i++){
        if(i == 1 || i == this.totalPages){
          this.pages.push(i);
        }else if((i >= page - this.neighboors && i <= page) || 
          (i >= page && i <= page + this.neighboors)){
          this.pages.push(i);
        }else if((i == (page - this.neighboors - 1)) || 
          (i == (page + this.neighboors + 1))){
          this.pages.push('...');
        }
      }
    }
  },
  created (){
    this.page = 1;
    if(this.blogPagingPage){
      this.page = this.blogPagingPage
    }
    this.refreshPages(this.page);
  }
}
</script>

<style lang="scss">
  @import '../theme/_variables';
  #vwpPaging{
    padding: $size-3;
    margin-right: 0;
    margin-left: 0;
    background-color: $white;
    width:100%;
    .paging-link{
      text-align:center;
        padding: 0;
      a{
        border: 1px solid $primary;
        color: $primary;
        padding: 10px;
      }
      .is-active{
        background-color: $primary;
        color: $text-invert;
      }
    }
    .paging-wrapper{
      margin: 0 auto;
      padding-left: 0.75rem;
      display: block;
      width: 100%;
      max-width: $weight-light*1px;
    }
    .is-active{
      font-weight: bold;
    }
    .paging-wrapper-inner{
      display: flex;
    }
  }
</style>