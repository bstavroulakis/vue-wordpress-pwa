<template>
  <div>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Full Stack Weekly</strong> by
            <a
              target="_blank"
              rel="noopener"
              href="https://twitter.com/bstavroulakis"
              >Bill Stavroulakis</a
            >.
          </p>
          <div class="display-inline">
            <a
              :href="item.href"
              target="_blank"
              v-for="item in socialLinks"
              v-bind:key="item.src"
            >
              <clazy-load class="alignleft" :key="item.alt" :src="item.src">
                <img
                  :alt="item.alt"
                  :src="item.src"
                  style="height:40px;"
                  slot="image"
                />
                <div slot="placeholder">
                  ...
                </div>
              </clazy-load>
            </a>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  let Config = require("../app.config.js");
  export default {
    name: "app-footer",
    data: () => {
      return {
        socialLinks: [
          {
            alt: "Facebook",
            href: "https://www.facebook.com/bstavroulakis",
            src: `${Config.wpDomain}wp-content/uploads/2017/02/fbBtn.png`
          },
          {
            alt: "Google Plus",
            href: "https://plus.google.com/u/0/+BillStavroulakis",
            src: `${Config.wpDomain}wp-content/uploads/2017/02/gPlusBtn.png`
          },
          {
            alt: "LinkedIn",
            href: "https://www.linkedin.com/in/bstavroulakis",
            src: `${Config.wpDomain}wp-content/uploads/2017/02/linBtn.png`
          },
          {
            alt: "Github",
            href: "https://github.com/bstavroulakis",
            src: `${Config.wpDomain}wp-content/uploads/2017/02/githubBtn.png`
          },
          {
            alt: "Stack Overflow",
            href: "https://stackoverflow.com/users/501402/billaraw",
            src: `${
              Config.wpDomain
            }wp-content/uploads/2017/02/stackoverflow.png`
          },
          {
            alt: "Twitter",
            href: "https://twitter.com/bstavroulakis",
            src: `${Config.wpDomain}wp-content/uploads/2017/02/twitteBtn.png`
          },
          {
            alt: "Youtube",
            href: "https://www.youtube.com/user/bstavroulakis",
            src: `${Config.wpDomain}wp-content/uploads/2017/02/youtubeBtn.png`
          },
          {
            alt: "Mail",
            href: "mailto:bstavroulakis@gmail.com",
            src: `${Config.wpDomain}wp-content/uploads/2017/02/emailBtn.png`
          }
        ]
      };
    }
  };
</script>
