<template>
  <section>
    <div class="card personal-card" v-if="categories && categories.length === 1 && categories[0].slug === 'blog'">
      <div class="columns">
        <div class="column personal-img">
          <img src="https://api.fullstackweekly.com/wp-content/uploads/2017/03/bill-100x100.jpg"
          alt="Bill Stavroulakis" width="100" />
        </div>
        <div class="column is-three-quarters personal-desc">
          Hi, I’m <a href="https://twitter.com/bstavroulakis" rel="noopener" target="_blank">Bill Stavroulakis</a>, many years ago my journey started on this thing called Web Development.<br/><br/>
          <span class="is-pulled-left">Over here you can find all of the interesting things I find on my way.&nbsp;</span>
          <span class="is-pulled-left">This website is part of the <a href="https://github.com/bstavroulakis/vue-wordpress-pwa">vue-wordpress-pwa</a> project.</span>
          <div class="is-clearfix"></div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="columns category-posts" v-if="!categories || categories.length === 0">
      <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
      <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
      <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
    </div>
    <vwp-subcategory :categories="categories" ></vwp-subcategory>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import VwpSubcategory from 'components/vwpSubcategory.vue'
const fetchInitialData = (store, route) => {
  route.params.page = route.params.page || 1
  return store.dispatch(`category/getCategory`, {categorySlug: route.params.id, page: route.params.page})
}
export default {
  name: 'ThemePageCategory',
  components: {
    'vwp-subcategory': VwpSubcategory
  },
  computed: {
    ...mapGetters('category', [
      'categories'
    ])
  },
  methods: {
    loadPosts () {
      fetchInitialData(this.$store, this.$route)
    }
  },
  watch: {
    '$route' (to, from) {
      this.loadPosts()
    }
  },
  prefetch: fetchInitialData,
  mounted () {
    this.loadPosts()
  }
}
</script>

<style lang="scss">
  .personal-card{
    display: flex;
    padding: 10px;
    margin-bottom: 20px;
  }
  .personal-img{
    text-align: center;
    align-self: center;
    margin-bottom:0;
  }
  .personal-desc{
    align-self: center;
  }
  .category-posts{
    flex-wrap:wrap;
  }
</style>
