<template>
  <div v-if="categories && categories.length > 0">
    <div v-for="category in categories" v-bind:key="category.id">
      <h2>
        <router-link :to="'/category/' + category.slug + '/'">
          <span>{{ category.name }}</span>
        </router-link>
      </h2>
      <div
        class="columns category-posts"
        v-if="!category.posts || category.posts.length === 0"
      >
        <div class="column is-one-third">
          <div class="card fake-card">
            <div class="card-content">&nbsp;</div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card fake-card">
            <div class="card-content">&nbsp;</div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card fake-card">
            <div class="card-content">&nbsp;</div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card fake-card">
            <div class="card-content">&nbsp;</div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card fake-card">
            <div class="card-content">&nbsp;</div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card fake-card">
            <div class="card-content">&nbsp;</div>
          </div>
        </div>
      </div>
      <div class="columns category-posts category-posts-loaded">
        <div
          class="column is-one-third"
          v-for="(item) in category.posts"
          v-bind:key="item.id"
        >
          <vwp-post-card
            :post="item"
            :newFlag="newFlag"
            :categorySlug="category.slug"
          ></vwp-post-card>
        </div>
      </div>
      <div v-if="!hidePagination">
        <div class="columns"><div class="column"></div></div>
        <vwp-paging
          v-if="category.totalPages > 0"
          :totalPages="category.totalPages"
          :path="'/category/' + category.slug"
        ></vwp-paging>
      </div>
      <div class="columns"><div class="column"></div></div>
    </div>
  </div>
</template>

<script>
  import VwpPostCard from "./vwpPostCard.vue";
  import VwpPaging from "./vwpPaging.vue";
  export default {
    name: "vwp-subcategory",
    components: {
      "vwp-post-card": VwpPostCard,
      "vwp-paging": VwpPaging
    },
    props: ["hidePagination", "newFlag", "categories"]
  };
</script>
