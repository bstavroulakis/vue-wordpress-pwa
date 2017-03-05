"use strict"

const path = require('path')
const _exec = require('child_process').exec
const sw = require('./build.serviceWorker');
const fs = require('fs-extra');

const promisify = (ctx, func = ctx) => (...args) => {
  return new Promise((resolve, reject) => {
    func.apply(ctx, [...args, (err, result) => err ? reject(err) : resolve(result)])
  })
}
const exec = promisify(_exec)
const tasks = new Map()
const run = (task) => {
  const start = new Date()
  return Promise.all([].concat(tasks.get(task)())).then(() => {
    console.log(`[build] '${task}' done in ${new Date().getTime() - start.getTime()}ms`)
  }, (err) => console.error(err.stack))
}

const webpackBuild = () => exec('cross-env NODE_ENV=production webpack --progress --hide-modules')
const webConfig = () => fs.copySync(path.resolve(__dirname,'../web.config'), path.resolve(__dirname,'../dist/web.config'));

tasks.set('webpackBuild', webpackBuild);
tasks.set('serviceWorker', sw.exec);
tasks.set('webConfig', webConfig);
tasks.set('build', () =>
  run('webpackBuild')
  .then(() => Promise.all([run('serviceWorker')]))
  .then(() => Promise.all([run('webConfig')]))
)

run('build')
