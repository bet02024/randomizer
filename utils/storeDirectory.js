const fs = require("fs");
const { NFTStorage, File, Blob } = require('nft.storage')


const endpoint = 'https://api.nft.storage' // the default
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEY5RDlCZDRFMmVGRTExN2FhZWM1MTU0MjU2NkY2Mjk5Mjc1YUREYjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNTM2MTk3ODY5OSwibmFtZSI6Imx1Y2hhbmZ0In0.SSXh_diSSRvYfQc-I6g1Wwf7u_Oi9r9oH36Djk2BQTg' // your API key from https://nft.storage/manage
//const total = 10000;
const total = 1000;

async function main() {
  const storage = new NFTStorage({ endpoint, token });

  let files = [];
  for (var i = 0; i < total; i++){
        //files.push(new File([await fs.promises.readFile('fridas/ipfs_rand/'+i.toString())], i.toString()));
        files.push(new File([await fs.promises.readFile('build/json2/'+i.toString()+'.json' )], i.toString()));
        //files.push(new File([await fs.promises.readFile('build/json/'+i.toString()+'.json' )], i.toString()));
/**
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/favicon.ico')], 'favicon.ico'));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/index.html')], 'index.html'));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/logo512.png')], 'logo512.png' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/precache-manifest.97a01ce7ec01ff0efddc25ba3a1346de.js')], 'precache-manifest.97a01ce7ec01ff0efddc25ba3a1346de.js' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/asset-manifest.json')], 'asset-manifest.json'  ));
        //files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static')], 'static' ));
        //files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/css')], 'static/css' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/css/main.34de6062.chunk.css.map')], 'static/css/main.34de6062.chunk.css.map'  ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/css/2.7b4682b0.chunk.css.map')], 'static/css/2.7b4682b0.chunk.css.map' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/css/main.34de6062.chunk.css')], 'static/css/main.34de6062.chunk.css' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/css/2.7b4682b0.chunk.css')], 'static/css/2.7b4682b0.chunk.css' ));
      //  files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/js')], 'static/js'  ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/js/runtime~main.cc994734.js')], 'static/js/runtime~main.cc994734.js'  ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/js/main.7aa32c54.chunk.js')],  'static/js/main.7aa32c54.chunk.js' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/js/2.a58ac25e.chunk.js')], 'static/js/2.a58ac25e.chunk.js' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/js/2.a58ac25e.chunk.js.map')], 'static/js/2.a58ac25e.chunk.js.map' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/static/js/main.7aa32c54.chunk.js.map')], 'static/js/main.7aa32c54.chunk.js.map'  ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/manifest.json')], 'manifest.json' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/service-worker.js')], 'service-worker.js' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/robots.txt')], 'robots.txt' ));
        files.push(new File([await fs.promises.readFile('/Users/beto/Downloads/line/react-fusion-linechart/build/logo192.png')],  'logo192.png'));
**/

        //f//iles.push(new File([await fs.promises.readFile('fridas/ipfs/'+i.toString())], i.toString()));
  }
  console.log(files);
  const cid = await storage.storeDirectory(files);
  console.log({ cid });
  const status = await storage.status(cid);
  console.log(status);
}
main()
