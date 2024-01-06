"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { MODE } = require(path.join(basePath, "src/blendMode.js"));

const pixelFormat = {
  ratio: 16 / 128,
};
const formatPixel = {
  width: 512,
  height: 512,
};

const shuffleLayerConfigurations = false;
const debugLogs = false;
 
const background = {
  generate: false,
  brightness: "100%",
};

const format = {
  width: 768,
  height: 768,
};


const description = "Hooded Figures";
const baseUri = "hoodedfigures.com";
const collection = "Hooded Figures";
const engine = "Hooded Figures";
const start = 0;
const layerConfigurations = [
  {
    growEditionSizeTo: 210,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "Hoods" },
      { name: "Eyes" },
      { name: "Vapes" },
    ],
  },
];
 

const extraMetadata = {};
const rarityDelimiter = "#";
const uniqueDnaTorrance = 100000;

const preview = {
  thumbPerRow: 6,
  thumbWidth: 256,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

module.exports = {
  format,
  baseUri,
  pixelFormat,
  formatPixel,
  collection,
  engine,
  start,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
};
