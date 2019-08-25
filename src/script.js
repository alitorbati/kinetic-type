p5.disableFriendlyErrors = true

let pg
let textInput
let tilesSlider
let speedSlider
let springSlider
let ampXSlider
let ampYSlider

function setup() {
  frameRate(30)
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight);

  textInput = document.getElementById('textInput')
  tilesSlider = document.getElementById('tilesSlider')
  speedSlider = document.getElementById('speedSlider')
  springSlider = document.getElementById('springSlider')
  ampXSlider = document.getElementById('ampXSlider')
  ampYSlider = document.getElementById('ampYSlider')
}

function draw() {
  const stringWidth = textWidth(textInput.value)
  const textSize = (width / stringWidth) * 10

  background(0)
  pg.background(0)
  pg.fill(255)
  pg.textSize(textSize)
  pg.applyMatrix()
  pg.translate(width / 2, height / 2)
  pg.textAlign(CENTER, CENTER)
  pg.text(textInput.value, 0, 0)
  pg.resetMatrix()
  // image(pg, 0, 0)

  // const tilesX = 10
  // const tilesY = 10
  // const tilesX = map(mouseX, 0, width, 2, 10)
  // const tilesY = map(mouseY, 0, height, 2, 10)
  const tilesX = tilesSlider.value
  const tilesY = tilesX

  let tileW = width / tilesX
  let tileH = height / tilesY

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      // WARP
      let wave
      // wave = int(sin(frameCount * 0.05 + ( x * y ) * 0.07) * 100)
      // const speedOrSeed = frameCount / 10 // dynamic
      const speedOrSeed = frameCount * (speedSlider.value * .1) // dynamic
      const amplitude = 50 // 1+
      const offset = x * y
      // const spring = 0.07 // 0 -
      const spring = springSlider.value * 0.01
      wave = sin(speedOrSeed + offset * spring)

      const sourceX = wave * ampXSlider.value
      const sourceY = wave * ampYSlider.value

      // SOURCE
      const sx = x * tileW + sourceX
      const sy = y * tileH + sourceY
      const sw = tileW
      const sh = tileH

      // DEST
      const dx = x * tileW
      const dy = y * tileH
      const dw = tileW
      const dh = tileH

      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh)
    }
  }
}
