<template>
  <div>
    <app-newsletter class="hero is-primary"></app-newsletter>
    <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>Full Stack Weekly</strong> by <a target="_blank" rel="noopener" href="https://twitter.com/bstavroulakis">Bill Stavroulakis</a>.
        </p>
        <p>
          <div>
            <a class="left margin_right"  rel="noopener" target="_blank" href="https://www.facebook.com/bstavroulakis">
              <img alt="Facebook" style="height:40px;" :src="wpDomain + 'wp-content/uploads/2017/02/fbBtn.png'" />
            </a>
            <a class="left margin_right" rel="noopener" target="_blank" href="https://plus.google.com/u/0/+BillStavroulakis">
              <img alt="Google Plus" style="height:40px;" :src="wpDomain + 'wp-content/uploads/2017/02/gPlusBtn.png'" />
            </a>
            <a class="left margin_right" rel="noopener" target="_blank" href="https://www.linkedin.com/in/bstavroulakis">
              <img alt="LinkedIn" style="height:40px;" :src="wpDomain + 'wp-content/uploads/2017/02/linBtn.png'" />
            </a>
            <a class="left" rel="noopener" target="_blank" href="https://github.com/bstavroulakis">
              <img alt="Github" style="height:40px;" :src="wpDomain + 'wp-content/uploads/2017/02/githubBtn.png'" />
            </a>
            <a class="left"  rel="noopener" target="_blank" href="https://stackoverflow.com/users/501402/billaraw">
              <img alt="Stack Overflow" class="margin_right" style="height:40px;" :src="wpDomain + 'wp-content/uploads/2017/02/stackoverflow.png'" />
            </a>
            <a class="left margin_right" rel="noopener" target="_blank" href="https://twitter.com/bstavroulakis">
              <img alt="Twitter" style="height:40px;" :src="wpDomain + 'wp-content/uploads/2017/02/twitteBtn.png'" />
            </a>
            <a class="left margin_right"  rel="noopener" target="_blank" href="https://www.youtube.com/user/bstavroulakis">
              <img alt="Youtube" style="height:40px;" :src="wpDomain + 'wp-content/uploads/2017/02/youtubeBtn.png'" />
            </a>
            <a class="left" rel="noopener" href="mailto:bstavroulakis@gmail.com" >
              <img alt="Mail" style="height:40px;" :src="wpDomain + 'wp-content/uploads/2017/02/emailBtn.png'" />
            </a>
            <div class="clearfix"></div>
          </div>
        </p>
      </div>
    </div>
    </footer>
  </div>
</template>
<script>
import AppNewsletter from './AppNewsletter.vue'
let Config = require('../app.config.js')
export default {
  name: 'app-footer',
  components: { 'app-newsletter': AppNewsletter },
  data: () => {
    return {
      wpDomain: ''
    }
  },
  created () {
    this.wpDomain = Config.wpDomain
  }
}
</script>