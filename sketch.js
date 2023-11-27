var xspacing = 30;    // wavelenght
var theta = 0.0;      // Start angle at 0
var amplitude = 75.0; // Height of wave
var wavelength = 500.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var r;//colors
var g;
var b;
var vc;
//
var cSlider; // these are sliders


function calculateWavelength(temperature) {
  const T = parseFloat(temperature) + 273.15;
  const wavelength = 2.8977719 / T;
  return (wavelength * Math.pow(10, 9) / 1000).toFixed(2); // Divide by 1000
}

function calculateFrequency(temperature) {
  const frequency = 5.8789232 * Math.pow(10, 10) * (parseFloat(temperature) + 273.15);
  return (frequency * Math.pow(10, -12)).toFixed(2); // Convert to terahertz
}

function updateValues() {
  const temperature = parseFloat(cSlider.value());
  const calculatedWavelength = calculateWavelength(temperature);
  wavelength = calculatedWavelength/3;
  const calculatedFrequency = calculateFrequency(temperature);
  document.getElementById('wavelengthValue').textContent = calculatedWavelength;
  document.getElementById('frequencyValue').textContent = calculatedFrequency;
  document.getElementById('currentSliderValue').textContent = temperature;
}



function setup() {
  createCanvas(1500, 300);
  w = width+90;
  yvalues = new Array(floor(w/xspacing));
  cSlider = createSlider(2800, 5500, 4150);
  cSlider.class("temperatureSlider");

}

function draw() {
dx = (TWO_PI / wavelength) * xspacing;
//wavelength= cSlider.value()/10;
wavelength= cSlider.value()/10;
updateValues();
  var vc = cSlider.value()
  if ((399<vc) && (vc<455)){
  r=177;
  g=7;
  b=248;
  }
  
  if ((455<vc) && (vc<492)) {
  r=20;
  g=64;
  b=253;
  }
  
  if ((492<vc) && (vc<577)){
  r=49;
  g=203;
  b=37;
  }
  
  if ((577<vc) && (vc<597)){
  r=252;
  g=255;
  b=0;
  }
  
  if ((597<vc) && (vc<620)){
  r=255;
  g=150;
  b=0;
  }
  
  if ((620<vc) && (vc<700)){
  r=255;
  g=0; 
  b=0;
  }
  background(256);
  renderWave();
  calcWave();
}

function calcWave() {
  theta += 0.07;
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = Math.sin(x)*amplitude;
    x+=dx;
  }

}

function renderWave() {
  strokeWeight(4);
  stroke(r,g,b);
  beginShape();
    for (var x1 = -1; x1 < yvalues.length; x1++) {
    curveVertex(x1*xspacing, height/2.5+yvalues[x1]);
    }
  endShape();

}
