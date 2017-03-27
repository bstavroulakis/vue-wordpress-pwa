<template>
  <div>
    <div v-if="categories && categories.length > 0">
      <div v-for="category in categories">
        <h2>
          {{category.name}}
        </h2>
        <div class="columns category-posts" v-if="!category.posts || category.posts.length === 0">
          <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
          <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
          <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
          <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
          <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
          <div class="column is-one-third"><div class="card fake-card"><div class="card-content">&nbsp;</div></div></div>
        </div>
        <div class="columns category-posts">
          <div class="column is-one-third" v-for="(item, index) in category.posts">
            <vwp-post-card :post="item" :newFlag="newFlag" :category="category"></vwp-post-card>
          </div>
        </div>
        <div v-if="!hidePagination">
          <div class="columns"><div class="column"></div></div>
          <vwp-paging v-if="category.totalPages > 0" :totalPages="category.totalPages" :path="'/category/' + category.slug"></vwp-paging>
        </div>
        <div class="columns"><div class="column"></div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VwpPostCard from './vwpPostCard'
export default {
  name: 'vwp-subcategory',
  components: {
    'vwp-post-card': VwpPostCard,
    'vwp-paging': require('./vwpPaging.vue')
  },
  props: ['hidePagination', 'newFlag'],
  computed: {
    ...mapGetters('category', [
      'categories'
    ])
  }
}
</script>
