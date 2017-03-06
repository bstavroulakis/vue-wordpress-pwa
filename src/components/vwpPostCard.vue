<template>
    <div id="vwp-post-card" class="card is-fullheight">
      <div class="card-image">
        <figure class="image" v-if="post.better_featured_image && post.better_featured_image.media_details.sizes.medium">
          <img v-bind:src="post.better_featured_image.media_details.sizes.medium.source_url" v-bind:alt="post.better_featured_image.description">
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="post-title">
            <router-link :to="'/category/' + category.slug + '/' + post.slug" v-html="post.title.rendered"></router-link>
          </div>
          <p class="is-clearfix"></p>
          <div v-html="post.excerpt.rendered"></div>
          <span v-for="tag in post.tags">#{{tag}}</span>
          <br>
          <small>{{post.date}}</small>
        </div>
      </div>
      <footer class="card-footer">
        <router-link :to="'/category/' + category.slug + '/' + post.slug" class="card-footer-item">Read More</router-link>
      </footer>
    </div>
</template>

<script>
export default {
  name: 'vwp-post-card',
  props: ['post','category']
}
</script>

<style lang="scss">
  @import '../theme/_variables';
  #vwp-post-card{
    padding-bottom: 40px;
    height:100%;
    .post-title a{
      font-size: $size-4;
      color: $primary;
      padding:0 0 10px 0;
      font-weight: bold;
    }
    .card-image img{
      max-height:250px;
      width: auto;
      margin: 0 auto;
    }
    .content{
      word-break: normal;
      word-wrap: break-word;
    }
    footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
    }
  }
</style>
