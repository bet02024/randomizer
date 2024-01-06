"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");

console.log(path.join(basePath, "/src/config.js"));

const name = "";
const baseUri = "";

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
let index_random = Array.from({length: 1000}, (_, i) => i + 1);
shuffle(index_random);
// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
data.forEach((item) => {
  item.edition = index_random[item.edition];
  item.name = "Ascend Node Club#" + item.edition;
  fs.writeFileSync(
    `${basePath}/build/json2/${item.edition}.json`,
    JSON.stringify(item, null, 2)
  );
});
fs.writeFileSync(
  `${basePath}/build/json2/_metadata.json`,
  JSON.stringify(data, null, 2)
);
