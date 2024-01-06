const { FFScene, FFText, FFVideo, FFAlbum, FFImage, FFGifImage, FFCreator } = require("ffcreator");
const path = require('path');
const colors = require('colors');
const { exec } = require("child_process");

const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");
console.log(path.join(basePath, "/src/config.js"));
const { baseUri, description } = require(path.join(basePath, "/src/config.js"));

let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);


const startCreating = async (index) => {
  const outputDir = path.join(__dirname, '../build/');
  const cacheDir = path.join(__dirname, '../cache/');
  const width = 1000;
  const height = 1000;

  const creator = new FFCreator({
      cacheDir,
      outputDir,
      width: width,
      height: height,
      fps: 15,
      output: "build/" + index + ".mp4"
  });
  const scene = new FFScene();
  const scene2 = new FFScene();

  const randomIndex = (min, max) => Math.floor(Math.random() * (max - min)) + min;


  let backs = ["BG GIF 1#40.gif",
  "BG GIF 10#1.gif",
  "BG GIF 2#15.gif",
  "BG GIF 3#20.gif",
  "BG GIF 4#10.gif",
  "BG GIF 5#5.gif",
  "BG GIF 6#3.gif",
  "BG GIF 7#2.gif",
  "BG GIF 8#2.gif",
  "BG GIF 9#2.gif"];

/**  let backs = ["Background1#10.gif",
  "Background10#10.gif",
  "Background9#10.gif",
  "Background8#10.gif",
  "Background7#10.gif",
  "Background6#10.gif",
  "Background5#10.gif",
  "Background4#10.gif",
  "Background3#10.gif"];**/

/**let bodies = ["White#16.gif",
"Alien#5.gif",
"GalaxyP#9.gif",
"GalaxyR#8.gif",
"Goldy#4.gif",
"Grey#11.gif",
"Lightblue#13.gif",
"Magma#7.gif",
"Peach#15.gif",
"Red#12.gif"]**/

  let randA = randomIndex(0,9);
  //let randB = randomIndex(0,8);

  const background = new FFGifImage({ path: path.join(__dirname, '../layers/Background/'+ backs[randA]), x: width/2 ,y: height/2 });

  //const body = new FFGifImage({ path: path.join(__dirname, '../layers/Body/'+ bodies[randB]), x: width/2, y: height/2 });

  const image = new FFImage({ path: path.join(__dirname, "../build/images/" + index + ".png"), x: width/2, y: height/2 });



  let backjson = {trait_type: "Background", value: backs[randA].replaceAll(/\#.*/ig,"") };
  //let bodyjson = {trait_type: "Boody", value: bodies[randB].replaceAll(/\#.*/ig,"") };

  let item = data[index];
  item.attributes.push(backjson);
  //item.attributes.push(bodyjson);
  item.image = `${index}.gif`;
  //item.properties.files[0].uri = `${index}.gif`;
  //item.properties.files[0].type = "image/gif";
  fs.writeFileSync(
    `${basePath}/build/json/${index}.json`,
    JSON.stringify(item, null, 2)
  );

  console.log("NFT ID,", index, ", Background,", backs[randA]);

  background.frameBuffer = 24;
//body.frameBuffer = 10;

  scene.addChild(background);
//  scene.addChild(body);
  scene.addChild(image);

  scene.setDuration(1.6);
  //scene.start();
  //scene.setTransition('ButterflyWaveScrawler', 0.5);
  creator.addChild(scene);
  creator.setFps(24);
  creator.start();
  //creator.openLog();

  creator.on('start', () => {
    console.log(`FFCreator start`);
  });

  creator.on('error', e => {
    console.log(colors.red(`FFCreator error: ${e.error}`));
  });

  creator.on('progress', e => {
    console.log(colors.yellow(`FFCreator progress: ${(e.percent * 100) >> 0}%`));
  });

  creator.on('complete', e => {
    console.log(
      colors.magenta(`FFCreator completed  `, e),
    );
  });
  return creator;
  //ffmpeg -i build/1.mp4 -s 1000x1000 -loop 0 -vf ';scale=1000:-1:flags=lanczos,palettegen=stats_mode=full' -r 18 1.gif
};

//0 - 50
function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function generate() {
  for (var i = 3333; i <= 3342; i++ ){
     console.log("Generate Index :" + i);
     startCreating(i);
     await sleep(7400);
    /** exec("ffmpeg -i 'build/"+i+".mp4' -s 1000x1000 -loop 0  -r 24 'build/"+i+".gif'", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
      });**/
  }
}



generate();

//for i in {0..777}
// do
//ffmpeg -i "build/$i.mp4" -s 1000x1000 -loop 0  -r 10 "build/$i.gif"
// done

//ffmpeg -i build/0.mp4 -vf "fps=10,scale=1000:-1:flags=lanczos" -c:v pam -f image2pipe - | convert -delay 10 - -loop 0 -layers optimize build/0.gif

/**

for i in {3333..3342}
do
  ffmpeg  -t 1.6 -i "build/$i.mp4" -vf "fps=24,scale=500:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "build/_$i.gif";
  ffmpeg  -t 1.6 -i "build/$i.mp4" -vf "fps=24,scale=1000:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "build/$i.gif";
done

**/
