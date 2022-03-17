class Arrow {
  constructor(x, y, w, h) {
    var options = {
      isStatic: true
    };
    this.w = w;
    this.h = h;
    this.speed = 0.05;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    this.array = ["./assets/knife_arrow.png","./assets/poison_arrow.png","./assets/bolt_arrow.png","./assets/smoke_arrow.png"]
    this.num = Math.round(random(0,3));
    //console.log("#####################"+num);
    this.image = loadImage(this.array[this.num]);
    this.animation = [this.image];
    World.add(world, this.body);
  }

  animate() {
    this.speed += 0.05;
  }

  remove(index) {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

    this.speed = 0.05;
    setTimeout(() => {
      Matter.World.remove(world, this.body);
      delete arrows[index];
    }, 1000);
  }

  shoot() {


    var velocity = p5.Vector.fromAngle(50);;
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x *(30), y: 0});
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, 0, this.w, this.h);
    pop();

    if (this.body.velocity.x > 0 && pos.x > 10 && !this.isSink) {
      var position = [pos.x, pos.y];
    }
  }

  /*delete(type, index){
    if(type == 1 && this.num == 0){
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

      this.speed = 0.05;
      Matter.World.remove(world, this.body);
      delete arrows[index];
    }

    else if(type == 2 && this.num == 1){
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

      this.speed = 0.05;
      Matter.World.remove(world, this.body);
      delete arrows[index];
    }

    else if(type == 3 && this.num == 2){
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

      this.speed = 0.05;
      Matter.World.remove(world, this.body);
      delete arrows[index];
    }

    else if(type == 4 && this.num == 3){
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

      this.speed = 0.05;
      Matter.World.remove(world, this.body);
      delete arrows[index];
    }
  }*/
}
