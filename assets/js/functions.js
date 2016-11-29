
var stage = new PIXI.Container();

var triangleContainer = triangleInit(200, 200, 100, 100, "assets/videos/balloon.mp4", "assets/images/placeholder.jpg", "turquise", "Title one");
var triangleContainer2 = triangleInit(200, 200, 400, 200, "assets/videos/wos.mp4", "assets/images/placeholder2.jpg", "blue", "Title 2");
var triangleContainer3 = triangleInit(200, 200, 600, 100, "assets/videos/wos.mp4", "assets/images/placeholder3.jpg", "green", "Whatever");

for(var i = 0; i < 10; i++) {
  stage.addChild(triangleSimple(200, 200));
}

stage.addChild(triangleContainer);
stage.addChild(triangleContainer2);
stage.addChild(triangleContainer3);


animate();
function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
  PIXI.tweenManager.update();
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}