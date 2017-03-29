'use strict'

process.env.VUE_ENV = 'server'
const isProd = !(process.env.NODE_ENV === 'development')
const cdnClient = (isProd) ? 'https://fullstackweekly-client.azureedge.net' : '/assets'

const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const compression = require('compression')
const favicon = require('serve-favicon')
const serialize = require('serialize-javascript')

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const app = express()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'fullstackweekly-client.azureedge.net');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

var cacheControl = function(req, res, next) {
  if (isProd) {
    res.header('Cache-Control', 'public, max-age=86400, no-cache') // one day
  } else {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate') // never
  } 
  next()
}

app.disable('x-powered-by')
app.use(compression())
app.use(cacheControl)
app.use(allowCrossDomain)

// parse index.html template
const html = (() => {
  let template = fs.readFileSync(resolve('./index.html'), 'utf-8')
  template = template.replace(/{{ CDN }}/gmi, cdnClient)
  const i = template.indexOf('{{ APP }}')
  // styles are injected dynamically via vue-style-loader in development
  // const style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">' : ''
  return {
    head: template.slice(0, i).replace('{{ STYLE }}', ''),
    tail: template.slice(i + '{{ APP }}'.length)
  }
})()

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

function createRenderer (bundle) {
  return createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

if (isProd) {
  app.use('/', express.static(resolve('./dist')))
  app.use(favicon(path.resolve(__dirname, './dist/favicon.ico')))
} else {
  app.use('/dist', express.static(resolve('./dist'))) 
  app.use(favicon(path.resolve(__dirname, 'src/assets/favicon.ico')))
}

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  var s = Date.now()
  const context = { url: req.url }
  const renderStream = renderer.renderToStream(context)
  let firstChunk = true

  res.write(html.head)

  renderStream.on('data', chunk => {
    if (firstChunk) {
      // embed initial store state
      if (context.initialState) {
        res.write(
          `<script>window.__INITIAL_STATE__=${
            serialize(context.initialState, { isJSON: true })
          }</script>`
        )
      }
      firstChunk = false
    }
    res.write(chunk)
  })

  renderStream.on('end', () => {
    res.end(html.tail)
    console.log(`whole request: ${Date.now() - s}ms`)
  })

  renderStream.on('error', err => {
    console.log(err)
    throw err
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
