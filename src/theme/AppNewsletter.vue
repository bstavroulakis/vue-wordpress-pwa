<template>
  <section id="vwp-newsletter" class="">
    <div class="hero-body">
      <div class="container">
        <!-- Begin MailChimp Signup Form -->
        <div id="mc_embed_signup" class="columns is-vcentered">
          <div class="column is-one-third is-left">
            <p class="title">Full Stack Weekly <strong>Newsletter</strong></p>
            <p class="subtitle">A free weekly newsletter for full stack web developers!</p>
          </div>
          <div class="column">
            <form action="//fullstackweekly.us14.list-manage.com/subscribe/post?u=c327ca0aef5ca85988950be67&amp;id=459d58dda4" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate="novalidate">
              <div id="mc_embed_signup_scroll">
                <div class="control is-grouped">
                  <div class="control has-icon is-expanded">
                    <label>
                      <input type="email" value="" name="EMAIL" class="input is-flat required email" id="mce-EMAIL" placeholder="email address" required="" aria-required="true">
                    </label>
                    <span class="icon is-small">
                      <i class="icon-mail-alt"></i>
                    </span>
                  </div>
                  <div class="control">
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button is-outlined">
                  </div>
                </div>
                <div id="mce-responses">
                  <div class="notification is-danger response" id="mce-error-response" style="display:none"></div>
                  <div class="notification is-success response" id="mce-success-response" style="display:none"></div>
                </div>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true">
                  <input type="text" name="b_c327ca0aef5ca85988950be67_459d58dda4" tabindex="-1" value="">
                </div>
              </div>
            </form>
          </div>
        </div>
        <!--End mc_embed_signup-->
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'app-newsletter'
  }
</script>
