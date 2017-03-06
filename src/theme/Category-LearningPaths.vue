<template>
  <div>
    <div class="vwp-loading" v-if="loading">
        <img alt="loading" src="../assets/loading.gif" />
    </div>
    <h1>Learning Paths</h1>
    <div>What would you like to learn today?</div>
    <div class="columns"><div class="column"></div></div>
    <div class="columns">
      <div class="column category-learning-path is-one-third" v-for="(learningPath, index) in subCategories">
        <div class="card">
          <div class="card-image">
            <figure class="image" v-if="learningPath.better_featured_image">
              <img v-bind:src="learningPath.better_featured_image.source_url" v-bind:alt="learningPath.better_featured_image.description">
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <div class="post-title">
                <h2><router-link :to="learningPath.slug + '/'" v-html="learningPath.name"></router-link></h2>
              </div>
              <div v-html="learningPath.description"></div>
            </div>
          </div>
          <footer class="card-footer">
            <router-link :to="learningPath.slug + '/'" class="card-footer-item">Let's Go</router-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wordpressService from '../app.service.js'
export default {
  name: 'ThemeCategoryLearningPaths',
  data: () => {
    return { 
      subCategories: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'routeMetaId'
    ])
  },
  created(){
    wordpressService.getCategoryChildren(this, this.routeMetaId).then((categories) => {
      this.subCategories = categories;
      this.loading = false;
    })
  }
}
</script>

<style>
.category-learning-path .card{
    height:100%;
    padding-bottom:50px;
}
.category-learning-path .card-footer{
  bottom:0;
  position:absolute;
  width:100%;
}
</style>