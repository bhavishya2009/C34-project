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

var i;


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
  //btn1.mouseClicked(deleteArrow("knife",i))  
  pop();

  push();
  translate(btn2.position.x, btn2.position.y);
  imageMode(CENTER);
  image(btn2Img, 0, 0, 80, 70);
  //btn2.mouseClicked(deleteArrow("bolt",i))
  pop();

  push();
  translate(btn3.position.x, btn3.position.y);
  imageMode(CENTER);
  image(btn3Img, 0, 0, 80, 70);
  //btn3.mouseClicked(deleteArrow("smoke",i))
  pop();

  push();
  translate(btn4.position.x, btn4.position.y);
  imageMode(CENTER);
  image(btn4Img, 0, 0, 80, 70);
  //btn4.mouseClicked(deleteArrow("poison",i))
  pop();

  showBow();

  if (frameCount % 70 == 0) {
    var arrow = new Arrow(100, 500, 100, 50);
    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, bow.angle);
    arrows.push(arrow);
  }

  console.log("arrows length" + arrows.length);
  for (i = 0; i < arrows.length; i++) {
    showArrows(arrows[i], i);
    
    //if (arrows.length > 0){
      //CollisionWithDog(i);
    //}
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

function deleteArrow(image, index){
  arrows[index].remove(index);
  /*if(image == "knife"){
    //arrows[index].delete(1,index);
    Matter.World.remove(world,arrows[index]);
  }
  else if(image == "poison"){
    //arrows[index].delete(2,iindex);
    Matter.World.remove(world,arrows[index]);
  }
  else if(image == "bolt"){
    //arrows[index].delete(3,index);
    Matter.World.remove(world,arrows[index]);
  }
  else if(image == "smoke"){
    //arrows[index].delete(4,index);
    Matter.World.remove(world,arrows[index]);
  }*/
}

/*function CollisionWithDog(i){
  for (var i = 0; i < arrows.length; i++) {
    console.log(dog.x+" "+arrows[i].x);
    if (dog !== undefined && arrows[i] !== undefined) {
      var collision = Matter.SAT.collides(dog.body, arrows[i].body);
      console.log(dog.position);
      if (collision.collided) {
          arrows.remove(index);
        
        Matter.World.remove(world, dog.body);
        delete dog;
      }
    }
  }
}*/