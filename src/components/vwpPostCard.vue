<template>
  <div :class="{'vwp-post-card': true, 'card':true, 'new':isNew(post.date)}">
    <div class="card-image">
      <figure
        class="image"
        v-if="post.better_featured_image && post.better_featured_image.media_details 
        && post.better_featured_image.media_details.sizes.medium"
      >
        <clazy-load
          v-bind:src="cdnUrl(post.better_featured_image.media_details.sizes.medium.source_url)"
        >
          <img
            v-bind:alt="post && post.better_featured_image && post.better_featured_image.media_details"
            v-bind:src="cdnUrl(post.better_featured_image.media_details.sizes.medium.source_url)"
            slot="image"
          />
          <div slot="placeholder">
            ...
          </div>
        </clazy-load>
      </figure>
    </div>
    <div class="card-content" v-if="post && post.title">
      <div class="content">
        <div v-if="isNew(post.date)" class="is-new">new</div>
        <div class="post-title">
          <div v-if="post.slug && categorySlug">
            <a v-on:click="gotoPost(post)">
              <span v-html="post.title.rendered"></span>
            </a>
          </div>
        </div>
        <p class="is-clearfix"></p>
        <div v-html="post.excerpt.rendered"></div>
        <span v-for="tag in post.tags" v-bind:key="tag.id">>#{{ tag }}</span>
        <br />
        <small>{{ post.date }}</small>
      </div>
    </div>
    <footer class="card-footer">
      <router-link
        :to="'/category/' + categorySlug + '/' + post.slug"
        class="card-footer-item"
        >Read More</router-link
      >
    </footer>
  </div>
</template>

<script>
  import Config from "../app.config.js";
  export default {
    name: "vwp-post-card",
    props: ["post", "categorySlug", "newFlag"],
    methods: {
      gotoPost: function(post) {
        if (this.categorySlug && post && post.slug) {
          this.$router.push({
            path: "/category/" + this.categorySlug + "/" + post.slug
          });
        }
      },
      cdnUrl: function(url) {
        return url.replace("https://api.fullstackweekly.com/", Config.wpDomain);
      },
      isNew: function(postDateStr) {
        let postDate = new Date(postDateStr);
        postDate.setDate(postDate.getDate() + 6);
        // If new flag is set and it is posted in the last 6 days
        return this.newFlag && postDate.getTime() - new Date().getTime() > 0;
      }
    }
  };
</script>

<style lang="scss">
  @import "../_variables";
  .vwp-post-card {
    min-height: 350px;
    padding-bottom: 40px;
    height: 100%;
    &.new {
      border: 1px solid #898989;
    }
    .post-title a {
      font-size: $size-4;
      color: $primary;
      padding: 0 0 10px 0;
      font-weight: bold;
    }
    .card-image img {
      max-height: 250px;
      width: auto;
      margin: 0 auto;
    }
    .content {
      word-break: normal;
      word-wrap: break-word;
      .is-new {
        float: right;
        font-size: 80%;
        font-style: italic;
      }
    }
    footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
    }
  }
</style>
