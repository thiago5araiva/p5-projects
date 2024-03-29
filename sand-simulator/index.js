function make2DArray(cols, rows) {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0
    }
  }
  return arr
}

let grid
let cols
let rows
let w = 9
let hueValue = 200

function setup() {
  createCanvas(window.windowWidth, window.windowHeight)
  colorMode(HSB, 360, 255, 255)
  cols = floor(width / w)
  rows = floor(height / w)
  grid = make2DArray(cols, rows)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(0)
}

function mouseDragged() {
  let mouseCol = floor(mouseX / w)
  let mouseRow = floor(mouseY / w)

  let matrix = 2
  let extent = floor(matrix / 2)

  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      let col = mouseCol + i
      let row = mouseRow + j
      if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
        grid[col][row] = hueValue
      }
    }
  }

  hueValue += 1
  if (hueValue > 360) {
    hueValue = 1
  }
}

function draw() {
  background(0)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke()
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255)
        let x = i * w
        let y = j * w
        square(x, y, w)
      }
    }
  }
  let nextGrid = make2DArray(cols, rows)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j]
      if (state > 0) {
        let below = grid[i][j + 1]

        let dir = 1
        if (random(1) < 0.5) {
          dir *= -1
        }
        let belowA, belowB
        if (i + dir >= 0 && i + dir <= cols - 1) {
          belowA = grid[i + dir][j + 1]
        }
        if (i - dir >= 0 && i - dir <= cols - 1) {
          belowB = grid[i - dir][j + 1]
        }
        if (below === 0) {
          nextGrid[i][j + 1] = grid[i][j]
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = grid[i][j]
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] = grid[i][j]
        } else {
          nextGrid[i][j] = grid[i][j]
        }
      }
    }
  }
  grid = nextGrid
}
