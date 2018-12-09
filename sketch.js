var font;
var vehicles = [];
var slider;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  background(51);
  slider = createSlider(0, 60, 30)
  var codePoints = font.textToPoints('Code', width / 3, 200, 250, {
    sampleFactor: 0.1
  });
  var centralPoints = font.textToPoints('{Central}', width / 4, 400, 250, {
    sampleFactor: 0.1
  });

  for (var i = 0; i < codePoints.length; i++) {
    var pt = codePoints[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }

  for (var i = 0; i < centralPoints.length; i++) {
    var pt = centralPoints[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

let count = 0;

function draw() {
  check();
  colorMode(RGB)
  background(51, 80);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }

  if (count >= slider.value()) {
    let t = random(10);
    for (var i = 0; i < t; i++) {
      next();
    }
    count = 0;
  } else {
    count++
  }
}

function check() {
  if (mouseIsPressed && mouseY < windowHeight - 50) {
    next()
  }
}

function next() {
  vehicles[vehicles.length - 1].target = vehicles[0].target
  for (var i = 0; i < vehicles.length - 1; i++) {
    vehicles[i].target = vehicles[i + 1].target;
  }
}