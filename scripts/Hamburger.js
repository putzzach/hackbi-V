function Hamburger(x, y, imgSrc){
    this.x = x;
    this.y = y;
    this.imgSrc = imgSrc;

    this.show = function(){
        image(this.imgSrc, this.x, this.y);
    }
}
