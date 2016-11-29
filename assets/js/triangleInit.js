function triangleInit(width, height, x, y, videoUrl, imageUrl, bgClass, title) {

  var item_clicked = false;
  // randomize
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
  triangleContainer.x = x;
  triangleContainer.y = y;
  triangleContainer.hitArea = new PIXI.Polygon(arr);
  triangleContainer.interactive = true;

  //animating object
  var path = new PIXI.tween.TweenPath();
  path.moveTo(x, y);
  path.arcTo(350, 200, 450, window.innerWidth * Math.random() - width, window.innerHeight * Math.random() - height);
  path.closed = true;

  var tween = PIXI.tweenManager.createTween(triangleContainer);
  tween.path = path;
  tween.time = 13000;
  tween.easing = PIXI.tween.Easing.linear();
  //tween.pathReverse  =true;
  tween.loop = true;
  tween.start();


  var triangle = new PIXI.Graphics();
  triangle.beginFill(0xffffff, 1);
  triangle.drawPolygon(arr);
  triangle.endFill();

  // for testing purpuses sometimes you need to draw a path for animation
  //triangle.lineStyle ( 2 , 0x000000,  1);
  //triangle.drawPath(path);


  var video = document.createElement("video");
  video.preload = "auto";
  video.loop = true;
  video.autoplay = true;
  video.src = videoUrl;

  var videoTexture = PIXI.Texture.fromVideo(video);
  var videoSprite = new PIXI.Sprite(videoTexture);
  videoSprite.width = width;
  videoSprite.height = height;
  videoSprite.buttonMode = true;

  var imgTexture = PIXI.Texture.fromImage(imageUrl);
  var imageSprite = new PIXI.Sprite(imgTexture);
  imageSprite.width = width;
  imageSprite.height = height;
  imageSprite.buttonMode = true;

  triangleContainer.addChild(triangle);
  triangleContainer.addChild(imageSprite);
  triangleContainer.mask = triangle;

  triangleContainer.click = function (e) {
    var tween2 = PIXI.tweenManager.createTween(this);
    tween2.to({
      alpha: 1,
      width: window.innerWidth - Math.round(window.innerWidth / 4),
      height: window.innerHeight - Math.round(window.innerHeight / 4),
      x: Math.round(window.innerWidth / 8),
      y: Math.round(window.innerHeight / 8)

    });
    tween2.time = ANIMATION_TIME;
    tween2.start();

    item_clicked = !item_clicked;
  };

  triangleContainer.mouseover = function () {
    if(!item_clicked) {
      tween.stop();

      var tween2 = PIXI.tweenManager.createTween(this);
      tween2.to({
        alpha: 1
      });
      tween2.time = ANIMATION_TIME;
      tween2.start();

      this.addChild(videoSprite);
      this.removeChild(imageSprite);

      document.getElementsByTagName("body")[0].classList = [];
      document.getElementsByTagName("body")[0].classList.add(bgClass);
    }
  };

  triangleContainer.mouseout = function (e) {
    if(!item_clicked) {
      tween.start();
      var tween2 = PIXI.tweenManager.createTween(this);
      tween2.to({
        alpha: ALPHA_OFF,
        width: width,
        height: height
      });
      tween2.time = ANIMATION_TIME;
      tween2.start();

      this.removeChild(videoSprite);
      this.addChild(imageSprite);

      document.getElementsByTagName("body")[0].classList = [];
    }
  };

  return triangleContainer;
}