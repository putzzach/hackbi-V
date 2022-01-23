function Car(x, y, imgSrc, width, height, health, wealth, fuel) {
    this.x = x;
    this.y = y;
    this.imgSrc = imgSrc;
    this.width = width;
    this.height = height;
    this.health = health;
    this.wealth = wealth;
    this.fuel = fuel;

    this.show = function(){
        image(this.imgSrc, this.x, this.y);
    }

}
