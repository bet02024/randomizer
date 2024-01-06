
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
  //let rawdata = fs.readFileSync(`${basePath}/fridas/_metadata.json`);


  //let rawdata = fs.readFileSync("/Users/beto/Downloads/VAPORAPES/nfts/json/_metadata.json");

  let rawdata = fs.readFileSync(`${basePath}/build/json2/_metadata.json`);

  let data = JSON.parse(rawdata);

  for (const item of data) {

    //let image = item.image.replaceAll("http://img.fridasnft.com/", "");
    let image = item.image.replaceAll("/", "");
    //let indexImg = parseInt(image.replaceAll(".png", ""));


    //if (indexImg > 1976){
          //let filename = item.filename.replaceAll("http://img.fridasnft.com/", "");
          let cid = await upload(`${basePath}/build/images/${image}`);
          let sha = sha256File(`${basePath}/build/images/${image}`);
          //let cid = await upload(`/Users/beto/Downloads/VAPORAPES/nfts/gif/${image}`);
          //let sha = sha256File(`/Users/beto/Downloads/VAPORAPES/nfts/gif/${image}`);
          item.image = `ipfs://${cid}`;
        //  item.filename = `ipfs://${cid}`;
          item.sha256 = sha;
          fs.writeFileSync(
            //`${basePath}/fridas/images/1000/${item.edition}.json`,
            `${basePath}/build/json2/${item.edition}.json`,
            //`/Users/beto/Downloads/VAPORAPES/nfts/json/${item.edition}.json`,
            JSON.stringify(item, null, 2)
          );
          console.log("## Uploaded to IPFS: ", cid, image); // "http://ipfs.io/ipfs/"
    //}
  }

  fs.writeFileSync(
    //`${basePath}/fridas/metadata_ipfs_1000.json`,
    `${basePath}/build/json2/metadata_ipfs.json`,
    //`/Users/beto/Downloads/VAPORAPES/nfts/json/metadata_ipfs.json`,
    JSON.stringify(data, null, 2)
  );

  console.log("## Finish uploaded to IPFS: ");

}

main()
