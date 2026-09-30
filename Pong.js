console.log("Ha haa!");
const canvas = document.getElementById("canvaasi2");
const ctx = canvas.getContext("2d");
let raf;
let inputStates = {};
window.addEventListener('keydown', function(event) {
    console.log(event);
    if (event.key == "ArrowRight") {
        console.log("Oikea nuoli painettu");
        inputStates.right = true;
    }
    if (event.key == "ArrowLeft") {
        console.log("Vasen nuoli painettu");
        inputStates.left = true;
    }
}, false);
window.addEventListener('keyup', function(event) {
    console.log(event);
    if (event.key == "ArrowRight") {
        console.log("Oikea nuoli nostettu");
        inputStates.right = false;
}
else if (event.key == "ArrowLeft") {
    console.log("Vasen nuoli nostettu");
    inputStates.left = false;
}
}, false);
const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: "blue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};
const maila = {
    x: 250,
    y: 385,
    vx : 5,
    leveys: 100,
    korkeus: 15,
    color: 'red',
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.leveys, this.korkeus);
}
};
function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ball.draw();
maila.draw();
ball.x += ball.vx;
ball.y += ball.vy;
if (inputStates.right){
    maila.x = maila.x + maila.vx;
}
if (inputStates.left){
    maila.x = maila.x - maila.vx;
}
if (maila.x < 0) {
    maila.x = 0;
}
if (maila.x + maila.leveys > canvas.width) {
    maila.x = canvas.width - maila.leveys;
}
if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.vy = -ball.vy;
}
if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.vx = -ball.vx;
}
var testX = ball.x;
var testY = ball.y;
if (testX < maila.x) testX = maila.x;
else if (testX > (maila.x + maila.leveys)) (testX = maila.x + maila.leveys);
if (testY < maila.y) testY = maila.y;
else if (testY > (maila.y + maila.korkeus)) (testY = maila.y + maila.korkeus);
var distX = ball.x - testX;
var distY = ball.y - testY;
var dista = Math.sqrt((distX * distX) + (distY * distY));
if (dista <= ball.radius) {
    if (ball.x >= maila.x && ball.x <= (maila.x + maila.leveys)) {
        ball.vy *= -1;
    }
} else if (ball.y >= maila.y && ball.y <= (maila.y + maila.korkeus)) {
    ball.vx *= -1;
}
raf = window.requestAnimationFrame(draw);
}
draw();
