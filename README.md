# [vue-wordpress-pwa](https://www.fullstackweekly.com/category/blog)

> An offline-first SPA using Vue.js, the WordPress REST API and Progressive Web Apps

Live version: [https://www.fullstackweekly.com/](https://www.fullstackweekly.com/)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/singapore/renovate/master/license) [![Build Status](https://travis-ci.org/bstavroulakis/vue-wordpress-pwa.svg?branch=master)](https://travis-ci.org/bstavroulakis/vue-wordpress-pwa) [![David](https://david-dm.org/bstavroulakis/vue-wordpress-pwa.svg)](https://david-dm.org/bstavroulakis/vue-wordpress-pwa)
[![Lighthouse Accessibility Badge](https://api.fullstackweekly.com/services/lighthouse-score/Lighthouse_Accessibility.svg)](https://www.fullstackweekly.com/category/blog/) [![Lighthouse Best Practices Badge](https://api.fullstackweekly.com/services/lighthouse-score/Lighthouse_Best_Practices.svg)](https://www.fullstackweekly.com/category/blog/) [![Lighthouse Progressive Web App Badge](https://api.fullstackweekly.com/services/lighthouse-score/Lighthouse_Progressive_Web_App.svg)](https://www.fullstackweekly.com/category/blog/) [![Lighthouse Performance Badge](https://api.fullstackweekly.com/services/lighthouse-score/Lighthouse_Performance.svg)](https://www.fullstackweekly.com/category/blog/)

![alt tag](https://api.fullstackweekly.com/wp-content/uploads/2017/03/vue-wordpress-pwa.png)

## Description

This is the code for the [FullStackWeekly](https://www.fullstackweekly.com/) website. You can use it as a starter pack for your WordPress site as well.

Since WordPress can expose a REST API, this project uses Vue.js, Vue-router, Vuex, Vue-resource & Progressive Web App techniques to create an offline-first web client.

You can also fork the project and host it on Azure App Services with continuous integration using the deploy.cmd file (included)

Live version: [https://www.fullstackweekly.com/](https://www.fullstackweekly.com/)

## Getting Started

### Prerequisites

Make sure that [Node v11](https://nodejs.org/en/download/releases/) is installed.

## Features

- Modern JavaScript syntax with [ES6](https://github.com/lukehoban/es6features) via [babel](https://babeljs.io/).
- Module bundler via [webpack](https://webpack.github.io/).
- Components-based architecture via [Vue.js](https://vuejs.org/).
- State management via [Vuex](https://vuex.vuejs.org/en/).
- Cache busting via [file-loader](https://webpack.github.io/)
- Progressive Web App enabled with [service workers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
- Offline capable with [service workers, app cache](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
- CSS with [Sass](http://sass-lang.com/)

### Instructions

First, install the WordPress plugins to enhance its REST API

- Better REST API Featured Images
- REST API Enabler
- WP REST API - filter fields
- WP REST API - Pure Taxonomies

Then, clone the repo or create a fork

```bash
$ git clone https://github.com/bstavroulakis/vue-wordpress-pwa.git
```

Then, edit the config:

```bash
src/app.config.js
```

Then, edit the theme, routes and assets:

```bash
src/theme/
src/components/routerTypes.js
src/components/router.js
src/assets
```

Finally, to run the project for development with hot reload:

```bash
$ npm install
$ npm run dev
```

Or, build the project for production:

```bash
$ npm run build
```

### Deployment

Setup a new site on Azure App Services https://[fullstackweekly].azurewebsites.net
and as the path select your forked Github project.

Your site should be running on the path you created (https://[fullstackweekly].azurewebsites.net)!

It should work offline as well and with every commit it will deploy the changes to Azure.
Once the user refreshes the site he will receive the new cached version `immediately`.

License

MIT
