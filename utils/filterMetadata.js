"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");
const name = "";
const baseUri = "";

// read json data
let rawdata = fs.readFileSync(`${basePath}/fridas/metadata.json`);
let data = JSON.parse(rawdata);
let imagesArray = fs.readFileSync(`${basePath}/fridas/files.txt`).toString().replace(/\r\n/g,'\n').split("\n");
let dataUpdated = [];
data.forEach((item) => {
  if(imagesArray.indexOf(item.edition + ".jpg") !== -1){ //exist
    item.edition = imagesArray.indexOf(item.edition + ".jpg");
    item.name = "Frida #" + item.edition;
    item.number = item.edition;
    item.height = 1024;
    item.width = 1024;
    item.filename = item.image;
    fs.writeFileSync(
      `${basePath}/fridas/json1000/${item.edition}.json`,
      JSON.stringify(item, null, 2)
    );
    dataUpdated.push(item);
  }
});

fs.writeFileSync(
  `${basePath}/fridas/metadata1000.json`,
  JSON.stringify(dataUpdated, null, 2)
);
