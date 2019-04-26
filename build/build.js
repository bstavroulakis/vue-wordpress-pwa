"use strict";

const path = require("path");
const _exec = require("child_process").exec;
const sw = require("./build.serviceWorker");
const fs = require("fs-extra");
const staticAssets = require("./static-assets.json");

const promisify = (ctx, func = ctx) => (...args) => {
  return new Promise((resolve, reject) => {
    func.apply(ctx, [
      ...args,
      (err, result) => (err ? reject(err) : resolve(result))
    ]);
  });
};
const exec = promisify(_exec);
const tasks = new Map();
const run = task => {
  const start = new Date();
  return Promise.all([].concat(tasks.get(task)())).then(
    () => {
      console.log(
        `[build] '${task}' done in ${new Date().getTime() - start.getTime()}ms`
      );
    },
    err => console.error(err.stack)
  );
};

const clear = () => exec("rimraf ./dist");
const webpackClient = () =>
  exec(
    "cross-env NODE_ENV=production ./node_modules/webpack/bin/webpack.js --config ./build/webpack.client.config.js --progress --hide-modules"
  );
const webpackServer = () =>
  exec(
    "cross-env NODE_ENV=production ./node_modules/webpack/bin/webpack.js --config ./build/webpack.server.config.js --progress --hide-modules"
  );
const copyStaticAssets = () => {
  return new Promise((resolve, reject) => {
    for (var prop in staticAssets) {
      fs.copySync(
        path.resolve(__dirname, prop),
        path.resolve(__dirname, staticAssets[prop])
      );
    }
    resolve();
  });
};
const purifyCSS = () =>
  exec(
    "purifycss ./dist/assets/styles.css ./dist/assets/js/app.js --min --info --out ./dist/assets/styles.css"
  );

tasks.set("clear", clear);
tasks.set("webpackClient", webpackClient);
tasks.set("webpackServer", webpackServer);
tasks.set("copyStaticAssets", copyStaticAssets);
tasks.set("serviceWorker", sw.exec);
tasks.set("purifyCSS", purifyCSS);

tasks.set("build", () =>
  // run('serviceWorker')
  run("clear")
    .then(() => Promise.all([run("webpackClient")]))
    .then(() => Promise.all([run("webpackServer")]))
    .then(() => Promise.all([run("copyStaticAssets")]))
    .then(() => Promise.all([run("serviceWorker")]))
    .then(() => Promise.all([run("purifyCSS")]))
);

run("build");
