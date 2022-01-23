let carImg;
let carImg1;
let fuelImg;
let c2;
let car;
let width = 400;
let height = 400;
let speed = 3;
let LANE = 0;
let lines = new Array(10);
let timer = 0;
let lastCheck = 0;
let logs = [];
let r;
let cones = [];
let rowx;
let fuels = [];
let hamburgers = [];
let coins = [];
let anim =0;
let logx;
let conex;
let objectNum;
let frequency = 1000;

function preload() {
  carImg = loadImage('./assets/car.png');
  carImg1 = loadImage('./assets/car1.png');
  logImg = loadImage('./assets/log.png');
  coneImg = loadImage('./assets/cone.png');
  fuelImg = loadImage('./assets/ketchupMustard.png');
  fontRegular = loadFont('./assets/mexcellent rg.otf');
  hamburgerImg = loadImage("./assets/hamburger.png");
  coinImg = loadImage('./assets/coin.png');
}

function setup() {
  textFont(fontRegular);
  textSize(20);
  let cnv = createCanvas(width, height); // x y imgSrc width height health wealth gas
  cnv.position(450, 400, 'absolute');
  car = new Car(width / 2 - 60, height - 50, carImg, 100, 200, 5, 0, 100);
  for (let i = 0; i < lines.length; i++) {
    lines[i] = new Array(2);
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 2; j++) {
      lines[i][j] = new Line(140 + 125 * j, i * 50, 5, 15);
    }
  }
  run = false;
}

function draw() {
  if (car.health <= 0) {
    run = false;
    alert("You ran out of health!");
    showDeath();
    noLoop();
  }
  if (car.fuel <= 0) {
    run = false;
    alert('You ran out of fuel!');
    showDeath();
    noLoop();
  }
  clear();
  background(45, 45, 45);
  fill(215, 155, 0);
  rect(10, 0, 7, height);
  rect(width - 17, 0, 7, height);
  fill(30, 193, 63);
  text("Health: " + car.health, 30, 40);
  fill(45, 90, 128);
  text("Wealth: " + car.wealth, 30, 60);
  fill(20, 190, 255);
  text("Fuel: " + floor(car.fuel), 30, 80);
  translate(0, height / 2 - car.y + 75);

  if (run) {
    frequency = frequency - 0.1;

    checkCollisions();

    car.fuel = car.fuel - 0.1;

    if(millis() > anim + frequency - 500){
      if (car.imgSrc == carImg) {
        car.imgSrc = carImg1;
      } else {
        car.imgSrc = carImg;
      }
      anim = millis();
    }
    if (millis() > lastCheck + frequency) {
      rowx;
      objectNum = floor(random(10));
      speed = speed + 0.1;
      if (objectNum == 1) {
        r = floor(random(3)) + 1;
        if (r == 1) rowx = width / 2 - 20 - 125;
        if (r == 2) rowx = width / 2 - 20;
        if (r == 3) rowx = width / 2 - 20 + 125;
        logs[logs.length] = new Log(rowx, car.y - height, logImg);
      } else if (objectNum >= 2 && objectNum <= 5) {
        r = floor(random(3)) + 1;
        if (r == 1) rowx = width / 2 - 20 - 125;
        if (r == 2) rowx = width / 2 - 20;
        if (r == 3) rowx = width / 2 - 20 + 125;
        cones[cones.length] = new Cone(rowx, car.y - height, coneImg);
      } else if (objectNum >=6 && objectNum <= 10){
        r = floor(random(3)) + 1;
        if (r == 1) rowx = width / 2 - 20 - 125;
        if (r == 2) rowx = width / 2 - 20;
        if (r == 3) rowx = width / 2 - 20 + 125;
        hamburgers[hamburgers.length] = new Hamburger(rowx, car.y - height, hamburgerImg);
      }
      n = floor(random(3)) + 1;
      p = floor(random(4));
      if (p == 1 && n != r) {
        if (n == 1) fuelx = width / 2 - 20 - 125;
        if (n == 2) fuelx = width / 2 - 20;
        if (n == 3) fuelx = width / 2 - 20 + 125;
        fuels[fuels.length] = new Fuel(fuelx, car.y - height, fuelImg);
      } else if(p == 2 && n!= r){
        if (n == 1) fuelx = width / 2 - 20 - 125;
        if (n == 2) fuelx = width / 2 - 20;
        if (n == 3) fuelx = width / 2 - 20 + 125;
        coins[coins.length] = new Coin(fuelx, car.y - height, coinImg);
      }
      lastCheck = millis();
    }

    car.y = car.y - speed;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 2; j++) {
        if (car.y + 150 <= lines[i][j].y) lines[i][j].y = lines[i][j].y - height - 50;
        lines[i][j].show();
      }
    }
    for (let i = 0; i < logs.length; i++) {
      if (logs[i] instanceof Log) {
        logs[i].show();
      }
    }
    for (let i = 0; i < cones.length; i++) {
      if (cones[i] instanceof Cone) {
        cones[i].show();
      }
    }
    for(let i = 0; i < hamburgers.length; i++){
      if(hamburgers[i] instanceof Hamburger){
        hamburgers[i].show();
      }
    }
    for (let i = 0; i < fuels.length; i++) {
      if (fuels[i] instanceof Fuel) {
        fuels[i].show();
      }
    }
    for(let i =0; i < coins.length; i++){
      if(coins[i] instanceof Coin){
        coins[i].show();
      }
    }
    car.show();
  }


}

function keyPressed() {
  if (keyCode === LEFT_ARROW && run) {
    leftClick();
  } else if (keyCode === RIGHT_ARROW && run) {
    rightClick();
  }
}

function leftClick() {
  if (run) {
    if (LANE == 0 || LANE == 1 && run) {
      for (var i = 0; i < 125; i++) {
        car.x = car.x - 1;
      }
      LANE = LANE - 1;
    }
  }

}
function rightClick() {
  if (run) {
    if (LANE == 0 || LANE == -1 && run) {
      car.x = car.x + (1 * 125);
      LANE = LANE + 1;
    }
  }

}

function checkCollisions() {
  for (var i = 0; i < logs.length; i++) {
    if (logs[i].x >= car.x && logs[i].x <= car.x + 128 && logs[i].y + 17 >= car.y && logs[i].y <= car.y + 64) {
      logs[i] = 0;
      car.health = 0;
      run = false;
    }
  }
  for (var i = 0; i < cones.length; i++) {
    if (cones[i].x >= car.x && cones[i].x <= car.x + 128 && cones[i].y + 8 >= car.y && cones[i].y <= car.y + 80) {
      cones[i] = 0;
      car.health = car.health - 1;
    }
  }
  for (var i = 0; i < fuels.length; i++) {
    if (fuels[i].x >= car.x && fuels[i].x <= car.x + 128 && fuels[i].y + 8 >= car.y && fuels[i].y <= car.y + 80) {
      fuels[i] = 0;
      car.fuel = min(car.fuel+50, 100);
    }
  }

  for(var i = 0; i < hamburgers.length; i++){
    if(hamburgers[i].x >= car.x && hamburgers[i].x <= car.x + 128 && hamburgers[i].y + 40 >= car.y && hamburgers[i].y <= car.y + 80){
      hamburgers[i] = 0;
      car.health = car.health - 1;
    }
  }
  for(var i = 0; i < coins.length; i++){
    if(coins[i].x >= car.x && coins[i].x <= car.x+128 && coins[i].y + 8 >= car.y && coins[i].y <= car.y+64){
      coins[i] = 0;
      car.wealth = car.wealth+1;
    }
  }
}

function showDeath(){
  alert("You encountered: " + hamburgers.length + " hamburgers, " + cones.length + " cones, and " + logs.length + " logs");
}

function startClick() {
  run = true;
}
