#!/usr/bin/env node

const rollup = require("rollup");
const rollupTypescript = require("rollup-plugin-typescript2");
const { uglify } = require("rollup-plugin-uglify");
const { resolve } = require("path");
const nodeResolve = require("rollup-plugin-node-resolve");
const pwd = (...args) => resolve(process.cwd(), ...args);
const fs = require("fs-extra");
const argv = process.argv.splice(2);

function clearDir(dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      fs.remove(`$\{dir}/file`);
    });
  }
}

function haveArgv(...args) {
  let isHave = false;
  args.forEach((str) => {
    argv.forEach((v) => {
      if (v === str) {
        isHave = true;
      }
    });
  });

  return isHave;
}

clearDir(pwd("umd"));

const watchOptions = [
  {
    input: "./lib/addon/bindCss.ts",
    output: {
      file: "./umd/bindcss.js",
      format: "umd",
      name: "$bindcss",
      sourcemap: false,
      // globals: {
      //   keyframesSpring: 'keyframes-spring',
      // },
    },
    plugins: [
      nodeResolve(),
      rollupTypescript({
        useTsconfigDeclarationDir: false,
        declaration: false,
      }),
      uglify({
        sourcemap: false,
      }),
    ],
  },
  {
    input: "./lib/addon/bindCss.ts",
    output: {
      file: "./dev/bindcss.js",
      format: "umd",
      name: "$bindcss",
      sourcemap: false,
      // globals: {
      //   keyframesSpring: 'keyframes-spring',
      // },
    },
    plugins: [
      nodeResolve(),
      rollupTypescript({
        useTsconfigDeclarationDir: false,
      }),
    ],
  },
  {
    input: "./lib/index.ts",
    output: {
      file: "./umd/index.js",
      format: "umd",
      name: "$violent",
      sourcemap: false,
      globals: {
        keyframesSpring: 'keyframes-spring',
      },
    },
    plugins: [
      nodeResolve(),
      rollupTypescript({
        useTsconfigDeclarationDir: false,
        declaration: false,
      }),
      uglify({
        sourcemap: false,
      }),
    ],
  },
  {
    input: "./lib/index.ts",
    output: {
      file: "./dev/index.js",
      format: "umd",
      name: "$violent",
      sourcemap: false,
      globals: {
        keyframesSpring: 'keyframes-spring',
      },
    },
    plugins: [
      nodeResolve(),
      rollupTypescript({
        useTsconfigDeclarationDir: false,
      }),
    ],
  },
];
const watcher = rollup.watch(watchOptions);

// event.code can be one of:
//   START        — the watcher is (re)starting
//   BUNDLE_START — building an individual bundle
//   BUNDLE_END   — finished building a bundle
//   END          — finished building all bundles
//   ERROR        — encountered an error while bundling
//   FATAL        — encountered an unrecoverable error
watcher.on("event", (event) => {
  if (event.code === "ERROR") {
    console.log(event);
  } else if (event.code === "BUNDLE_END") {
    // console.log(event);
    console.log("BUNDLE_END");
  } else if (event.code === "END") {
    if (!haveArgv("--watch", "-w")) {
      watcher.close();
    }

    fs.copySync("./umd/index.js", "./webside/violent/index.js");
    fs.copySync("./umd/bindcss.js", "./webside/violent/bindcss.js");
  }
});
