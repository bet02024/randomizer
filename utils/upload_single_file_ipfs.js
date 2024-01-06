
const { NFTStorage, File, Blob } = require('nft.storage')
const sha256File = require('sha256-file');

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");

const endpoint = 'https://api.nft.storage' // the default
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEY5RDlCZDRFMmVGRTExN2FhZWM1MTU0MjU2NkY2Mjk5Mjc1YUREYjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNTM2MTk3ODY5OSwibmFtZSI6Imx1Y2hhbmZ0In0.SSXh_diSSRvYfQc-I6g1Wwf7u_Oi9r9oH36Djk2BQTg' // your API key from https://nft.storage/manage


async function upload(image) {

  const storage = new NFTStorage({ endpoint, token })
  const data = await fs.promises.readFile(image )
  const cid = await storage.storeBlob(new Blob([data]))
  //console.log({ cid })
  const status = await storage.status(cid)
  return cid
}

async function main() {

  // read json data
  //let rawdata = fs.readFileSync(`${basePath}/fridas/metadata.json`);

  //let rawdata = fs.readFileSync(`${basePath}/fridas/metadata1000.json`);
  //let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
  //let rawdata = fs.readFileSync(`${basePath}/fridas/_metadata.json`);

  let cid = await upload(`${basePath}/ascend/ASCEND_01.png`);
  console.log("## ASCEND_01 uploaded to IPFS: ", cid);

  let cid2 = await upload(`${basePath}/ascend/ASCEND_02.png`);
  console.log("##  ASCEND_02 Uploaded to IPFS: ", cid2);

  let cid3 = await upload(`${basePath}/ascend/ASCEND_03.png`);
  console.log("## ASCEND_03 Uploaded to IPFS: ", cid3);
}

main()
