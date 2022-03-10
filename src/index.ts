import { Application, Container, Graphics, Point, Rectangle, Sprite, Texture } from 'pixi.js'
import { PlayerMovementControl } from './playerMovementControl';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

const clampy: Sprite = Sprite.from("clampy.png");
// let bullet1: Texture = Texture.from("bullet1.png");
clampy.anchor.set(0.5);
clampy.x = app.screen.width / 4;
clampy.y = app.screen.height / 2;
clampy.width = 100;
clampy.height = 100;
clampy.anchor.set(0.5);

const clampy2:Sprite = Sprite.from("clampy.png");;
clampy2.anchor.set(0.5);
clampy2.x = app.screen.width ;
clampy2.y = app.screen.height / 2;
clampy2.width = 200;
clampy2.height = 200;
clampy2.anchor.set(0.5);
app.stage.addChild(clampy2, clampy)

const rocketCont:Container = new Container();
const rocket: Sprite = Sprite.from("rocket.png");
// let bullet1: Texture = Texture.from("bullet1.png");

rocket.anchor.set(0.5);

rocket.x = app.screen.width / 2;
rocket.y = app.screen.height / 2;
rocket.anchor.set(0.5);

// rocket.width = 80;
// rocket.height = 80;
// rocketCont.addChild(background);

rocketCont.addChild(rocket);
console.log(rocketCont)
rocketCont.interactive = true;
app.stage.addChild(rocketCont)
// document.querySelector("shooter")!.
// rocketCont.on("mousedown", function(e){
	
window.addEventListener("mousedown", function(e){
	console.log(e)
	shoot(rocket.rotation, {
		x: rocket.position.x+Math.cos(rocket.rotation) *20+6,
		y: rocket.position.y+Math.sin(rocket.rotation) * 20+6
	})
}
);

let bullets: any = [];
let bulletSpeed:number = 5;

function shoot(rotation:any , startPosition:any): void {
	// let bullet = new Sprite(bullet1);
	let bullet:Sprite = Sprite.from("fire.png")
	bullet.position.x = startPosition.x;
	bullet.position.y = startPosition.y;
	bullet.rotation = rotation;
	app.stage.addChild(bullet);
	bullets.push(bullet);
}
function rotateToPoint(  mx: number, my: number, px: number, py: number){  
	// var self = this;
	var dist_Y = my - py;
	var dist_X = mx - px;
	var angle = Math.atan2(dist_Y,dist_X);
	//var degrees = angle * 180/ Math.PI;
	return angle;
  }
animate();

function animate():void {
	requestAnimationFrame(animate);
	rocket.rotation = rotateToPoint(app.renderer.plugins.interaction.mouse.global.x, app.renderer.plugins.interaction.mouse.global.y, rocket.position.x, rocket.position.y);
	for(var b=bullets.length-1;b>=0;b--){
		bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
		bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
	}
	// console.log(b)
	app.stage.addChild(rocketCont);
}

let demoKeys:Sprite = createDemoKeys();
let playerMoveController: PlayerMovementControl =new PlayerMovementControl(app, rocket, new Rectangle(0,0,app.screen.width,app.screen.height), ["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"], demoKeys)
app.ticker.add(delta => gameLoop(delta));

function createDemoKeys():Sprite {
	let playerArrow: Sprite = new Sprite(Texture.from("arrows.png"));
	playerArrow.width = app.screen.width * 0.2;
	playerArrow.scale.y = playerArrow.scale.x;
	playerArrow.x = 20;
	playerArrow.y = app.screen.height - playerArrow.height-20;
	app.stage.addChild(playerArrow);

	return playerArrow
}
let speed:number = 0.5
function gameLoop(delta:number){
	//updating player movement
	playerMoveController.gameLoop(delta);
	clampy.x += speed;
	clampy2.x -= speed;
	// let playerLocal:Point = playerMoveController.
	if(rectsIntersect(clampy2, clampy)){
		speed = 0;
		// app.stage.removeChild(clampy);

	}
}

function rectsIntersect(a:any,b:any){
	let aBox = a.getBounds();
	let bBox = b.getBounds();

	return aBox.x + aBox.width > bBox.x &&
			aBox.x < bBox.x + bBox.width&&
			aBox.y + aBox.height > bBox.y &&
			aBox.y < bBox.y + bBox.height;
}