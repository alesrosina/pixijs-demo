function triangleSimple(width, height) {
  var arr = [
    0, 0,
    width, getRandomInt(Math.round(height/4), height - Math.round(height/4)),
    getRandomInt(Math.round(width/4), width - Math.round(width/4)), height,
    0, 0
  ];

  var triangleContainer = new PIXI.Container();
  triangleContainer.alpha = ALPHA_OFF;
  triangleContainer.width = width;
  triangleContainer.height = height;

  //animating object
  var path = new PIXI.tween.TweenPath();
  path.moveTo(window.innerWidth * Math.random() - width, window.innerHeight * Math.random() - height);
  path.arcTo(350, 200, 450, window.innerWidth * Math.random() - width, window.innerHeight * Math.random() - height);
  path.closed = true;

  var tween = PIXI.tweenManager.createTween(triangleContainer);
  tween.path = path;
  tween.time = 30000;
  tween.easing = PIXI.tween.Easing.linear();
  tween.loop = true;
  tween.start();


  var triangle = new PIXI.Graphics();
  triangle.lineStyle (1, 0xffffff,  1);
  triangle.drawPolygon(arr);

  triangleContainer.addChild(triangle);

  return triangleContainer;
}