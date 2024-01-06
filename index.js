"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { startCreating, buildSetup } = require(path.join(
  basePath,
  "/src/main.js"
  //"/src/mainAscend.js"
  //"/src/main_video.js"
));

(() => {
  buildSetup();
  startCreating();
})();
