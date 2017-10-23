'use strict'

process.env.VUE_ENV = 'server'
const isProd = !(process.env.NODE_ENV === 'development')
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const compression = require('compression')
const favicon = require('serve-favicon')
const serialize = require('serialize-javascript')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'fullstackweekly-client.azureedge.net')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  next()
}

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  return true
}

var cacheControl = function (req, res, next) {
  if (isProd) {
    res.header('Cache-Control', 'public, max-age=86400, no-cache') // one day
  } else {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate') // never
  }
  next()
}

var strictTransportSecurity = function (req, res, next) {
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  next()
}

// parse index.html template
const indexHTML = (() => {
  let template = ''
  if (isProd) {
    template = fs.readFileSync(resolve('./dist/index.html'), 'utf-8')
    template = template.replace('<link rel="stylesheet" href="/assets/styles.css" media="all">', '')
    template = template.replace('<script defer src="/assets/js/vendor.js"></script><script defer src="/assets/js/app.js"></script>', '')
  } else {
    template = fs.readFileSync(resolve('./index.html'), 'utf-8')
  }
  return template
})()

function createRenderer (bundle) {
  return createBundleRenderer(bundle)
}

const app = express()
app.disable('x-powered-by')
app.use(compression({threshold: 0, filter: shouldCompress}))
app.use(strictTransportSecurity)
app.use(cacheControl)
app.use(allowCrossDomain)

if (isProd) {
  app.use('/', express.static(resolve('./dist')))
  app.use(favicon(path.resolve(__dirname, './dist/favicon.ico')))
} else {
  app.use('/dist', express.static(resolve('./dist')))
  app.use('/service-worker.js', express.static(resolve('./src/service-worker.js')))
  app.use('/sw_config.js', express.static(resolve('./src/assets/sw-config.js')))
  app.use(favicon(path.resolve(__dirname, 'src/assets/favicon.ico')))
}

let renderer
if (isProd) {
  // create server renderer from real fs
  const bundlePath = resolve('./dist/server/main.js')
  renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'))
} else {
  require('./build/dev-server')(app, bundle => {
    renderer = createRenderer(bundle)
  })
}

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  const context = { url: req.url }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log('Error rendering to string: ')
      console.log(err)
      console.log(err.message)
      return res.status(200).send('Server Error')
    }
    html = indexHTML.replace('<div id="app"></div>', html)
    html = html.replace('<meta name="vue-state" />', `<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`)
    res.setHeader('Content-Length', Buffer.byteLength(html))
    res.write(html)
    res.end()
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
