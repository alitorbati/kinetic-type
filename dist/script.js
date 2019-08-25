let pg
var slider

function setup() {
  slider = createSlider(0, 255, 100);
  createCanvas(800, 800);
  pg = createGraphics(800, 800);
  
  
  
  // create sliders
  // rSlider = createSlider(0, 255, 100);
  // rSlider.position(20, 20);
}

function draw() {
  
  // const r = rSlider.value();
  
  background(0);
  pg.background(0);
  pg.fill(255);
  pg.textSize(800);
  pg.applyMatrix();
  const adjustLetterY = 80 // magic number
  pg.translate(width / 2, height / 2 - adjustLetterY);
  pg.textAlign(CENTER, CENTER);
  pg.text("a", 0, 0);
  pg.resetMatrix();
  // image(pg, 0, 0);
  
  // const tilesX = 20
  // const tilesY = 20
  const tilesX = map(mouseX, 0, width, 2, 20)
  const tilesY = map(mouseY, 0, height, 2, 20)
  
  let tileW = width / tilesX
  let tileH = height / tilesY
  
  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      // WARP
      let wave
      // wave = int(sin(frameCount * 0.05 + ( x * y ) * 0.07) * 100);
      const speedOrSeed = frameCount / 10 // dynamic
      const amplitude = 50 // 1+
      const offset = x * y
      const spring = 0.07 // 0 - 
      wave = sin(speedOrSeed + offset * spring) * amplitude
      
      const sourceX = wave
      const sourceY = wave

      // SOURCE
      const sx = x * tileW + sourceX;
      const sy = y * tileH + sourceY;
      const sw = tileW;
      const sh = tileH;
      
      // DEST
      const dx = x * tileW;
      const dy = y * tileH;
      const dw = tileW;
      const dh = tileH;
      
      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }
}