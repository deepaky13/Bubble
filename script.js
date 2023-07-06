let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*c.beginPath();
c.arc(200,200,20,0,Math.PI*2,false);
c.strokeStyle='red';
c.stroke();
c.closePath();*/
const c = canvas.getContext('2d');

var min =2;
var max=40;

var mouse={
   x:0,
   y:0
}
window.addEventListener('mousemove',
function(event){
   mouse.x=event.x;
   mouse.y=event.y;
   console.log(mouse);
}
)

let colorarray=[
   '#2c3e60',
   '#e74c3c',
   '#ecf0f1',
   '#349808',
   '#298889'
   ]


function circle(x, y, dx, dy, radius) {
   this.x = x;
   this.y = y;
   this.dx = dx;
   this.dy = dy;
   this.radius = radius;
 
   this.color=colorarray[Math.floor(Math.random()*(colorarray.length))];
   this.draw = function() {
      c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI*5,false);
     c.fillStyle=this.color;
      c.stroke();
    c.fill()
     c.closePath()
     
   }
   this.update = function() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
         this.dx = -this.dx;
      }
      

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
         this.dy = -this.dy;
      }
     this.x += this.dx;
      this.y += this.dy;
      
      //interactive
      if(mouse.x-this.x<50&&mouse.x-this.x>-50&&mouse.y-this.y<50&&mouse.y-this.y>-50){
         this.radius+=1;
      
     if(this.radius<max){
         this.radius+=1;
     }}
      else if(this.radius>min){
         this.radius-=1;
      }
      
      
      this.draw();
   }


}
let circlearray = [];
for (let i = 0; i < 500; i++) {
   let radius = Math.random()*40+1;
   let x = Math.random() * (innerWidth-radius*2)+radius;
   let y = Math.random() * (innerHeight-radius*2)+radius;
   let dx = Math.random()*5;
   let dy = Math.random()*5;
   
   circlearray.push(new circle(x, y, dx, dy, radius));
}

function recursive() {
   requestAnimationFrame(recursive);
  c.clearRect(0, 0, innerWidth, innerHeight);
   for(let a=0;a<circlearray.length;a++){
      circlearray[a].update();
      

}
}
recursive();
let can=document.querySelector('#draw');
let ctx=can.getContext('2d');
ctx.beginPath();
/*ctx.bezierCurveTo(50,100,50,50,200,100);
ctx.bezierCurveTo(50,100,50,50,100,100);
ctx.quardraticCurveTo(500,500,200,200);*/
ctx.arc(20,30,10,0,Math.PI+2,false);
ctx.arcTo(50,100,109,109,10);
//ctx.arcTo(49,30,69,79,10);
ctx.fillStyle='red';
ctx.fill();
ctx.closePath();
