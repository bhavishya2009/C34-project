const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world, backgroundImg;

var dogImg;

var bow, bowData, bowSpritesheet;
var arrowImg;
var bowAnimation = [];
var arrows = [];

var btn1Img, btn2Img, btn3Img, btn4Img;
var object, onTop;


function preload() {
  backgroundImg = loadImage("./assets/background.jpg");
  dogImg = loadImage("./assets/dog.gif");

  bowSpriteData = loadJSON("./assets/bow_and_arrow/bow_and_arrow.json");
  bowSpritesheet = loadImage("./assets/bow_and_arrow/bow_and_arrow.png");
  bowGIF = loadImage("./assets/bow.gif")

  arrowImg = loadImage("./assets/arrow.png");

  btn1Img = loadImage("./assets/knife_button.png");
  btn2Img = loadImage("./assets/lightning_button.png");
  btn3Img = loadImage("./assets/smoke_button.png");
  btn4Img = loadImage("./assets/poison_button.png");

  heartImg = loadImage("./assets/heart.png");

}

function setup() {
  createCanvas(800, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  var options = {
    isStatic: true
  }
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  dog = Bodies.rectangle(700, 500, 100, 150, options);
  World.add(world, dog);

  btn1 = Bodies.rectangle(700, 100, 50, 50, options);
  World.add(world, btn1);

  btn2 = Bodies.rectangle(700, 170, 50, 50, options);
  World.add(world, btn2);

  btn3 = Bodies.rectangle(700, 240, 50, 50, options);
  World.add(world, btn3);

  btn4 = Bodies.rectangle(700, 310, 50, 50, options);
  World.add(world, btn4);

}

function draw() {
  background(51);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);

  push();
  translate(dog.position.x, dog.position.y);
  imageMode(CENTER);
  image(dogImg, 0, 0, 160, 150);
  pop();

  push();
  translate(btn1.position.x, btn1.position.y);
  imageMode(CENTER);
  image(btn1Img, 0, 0, 80, 70);
  pop();

  push();
  translate(btn2.position.x, btn2.position.y);
  imageMode(CENTER);
  image(btn2Img, 0, 0, 80, 70);
  pop();

  push();
  translate(btn3.position.x, btn3.position.y);
  imageMode(CENTER);
  image(btn3Img, 0, 0, 80, 70);
  pop();

  push();
  translate(btn4.position.x, btn4.position.y);
  imageMode(CENTER);
  image(btn4Img, 0, 0, 80, 70);
  pop();

  showBow();
  if (frameCount % 70 == 0) {
    var cannonarrow = new Arrow(100, 500, 100, 50);
    cannonarrow.trajectory = [];
    Matter.Body.setAngle(cannonarrow.body, bow.angle);
    arrows.push(cannonarrow);
  }

  console.log("arrows length" + arrows.length);
  for (var i = 0; i < arrows.length; i++) {
    showArrows(arrows[i], i);
    //CollisionWithDog(i);
  }
}
function showBow() {
  bow = new Bow(100, 400, 200, 200, 100, bowGIF);
  bow.display();
  bow.animate();
}

function showArrows(arrow, index) {
  if (arrow) {
    arrow.display();
    arrow.animate();
    arrow.shoot();
    if (arrow.body.position.x >= width + 50 || arrow.body.position.y >= height - 50) {
      arrow.remove(index);
    }
  }
}

//function CollisionWithDog(){}