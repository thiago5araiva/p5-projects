const inc = 0.1
const scl = 10
let cols, rows
let fr
let zoff = 0

const particles = []
let flowfield = []

function setup() {
  createCanvas(window.windowWidth, window.windowHeight)
  cols = floor(width / scl)
  rows = floor(height / scl)
  fr = createP("")

  flowfield = new Array(cols * rows)

  for (let i = 0; i < 10000; i++) {
    particles[i] = new Particle()
  }
}

function draw() {
  let yoff = 0
  for (let y = 0; y < rows; y++) {
    let xoff = 0
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4
      let v = p5.Vector.fromAngle(angle)
      v.setMag(1)
      flowfield[index] = v
      xoff += inc
      stroke(0, 50)
      // push()
      // translate(x * scl, y * scl)
      // rotate(v.heading())
      // strokeWeight(1)
      // line(0, 0, scl, 0)
      // pop()
    }
    yoff += inc
    zoff += 0.0004
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].edges()
    particles[i].show()
    particles[i].follow(flowfield)
  }

  fr.html(floor(frameRate()))
}
