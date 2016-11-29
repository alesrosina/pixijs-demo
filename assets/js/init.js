
const ANIMATION_TIME = 500;
const ALPHA_OFF = 0.4;

var renderer = new PIXI.autoDetectRenderer(
    window.innerWidth,
    window.innerHeight,
    {
      transparent: true,
      antialias: true
    });

document.body.appendChild(renderer.view);

window.onresize = function() {
  renderer.resize(window.innerWidth, window.innerHeight);
};
