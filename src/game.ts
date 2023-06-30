import * as three from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { World } from "./world";
import { Player } from "./player";
import { canvas, c, WIDTH, HEIGHT } from "./vars";
import { Block } from "./block";
// import * as cannon from "cannon";

class Game {
	FPS = 60;
	interval = null as NodeJS.Timer;
	keys: object = {};
	debug = false;

	world = null as World;
	player = null as Player;
	camera = null as three.PerspectiveCamera;
	renderer = null as three.WebGLRenderer;
	scene = null as three.Scene;

	controls = null as PointerLockControls;

	lastFrame = null as number;
	thisFrame = null as number;
	delta = null as number;
	paused = true;

	// physicsWorld = null as cannon.World;

	// skyboxGeo = null as three.BoxGeometry
	// skyboxMat = null as three.Material
	// skybox = null as three.Mesh

	Update = () => {
		this.thisFrame = Date.now();
		this.delta = (this.thisFrame - this.lastFrame) / 100;
		this.lastFrame = this.thisFrame;

		if (this.paused)
			return;

		this.player.Update(this.delta);
		this.world.Update();
		// this.controls.update(this.delta)

		const playerpos = this.player.pos;
		this.camera.position.set(playerpos.x, playerpos.y, playerpos.z);
		this.camera.position.y += 1;

		// let campos = this.camera.position
		// this.skybox.position.set(campos.x, campos.y, campos.z)

		this.renderer.render(this.scene, this.camera);
	};

	Start = () => {
		this.lastFrame = Date.now();
		this.world = new World();

		this.renderer.render(this.scene, this.camera);

		this.controls.addEventListener("lock", () => this.paused = false);
		this.controls.addEventListener("unlock", () => this.paused = true);

		this.interval = setInterval(this.Update, 1000 / this.FPS);
	};
	
	Debug = () => {
		this.debug = !this.debug;
		this.world.Debug(this.debug);
	};
	
	Init = () => {
		// this.physicsWorld = new cannon.World();
		// this.physicsWorld.gravity.set(0, -9.82, 0);
		// this.physicsWorld.broadphase = new cannon.NaiveBroadphase();
		// this.physicsWorld.solver.iterations = 10;
		// this.physicsWorld.broadphase = new cannon.GridBroadphase();

		this.scene = new three.Scene();
		this.scene.background = new three.Color("#00afff");
		this.camera = new three.PerspectiveCamera(60, 1, 0.1, 2000);
		this.player = new Player(this.camera);
		// this.camera = new Camera(this.player)
		
		this.renderer = new three.WebGLRenderer({ canvas: canvas, context: c, antialias: true });
		this.renderer.setSize(WIDTH, HEIGHT);
		
		this.controls = new PointerLockControls(this.camera, canvas);
		this.controls.minPolarAngle = 0.00001;
		this.controls.maxPolarAngle = Math.PI - 0.00001;

		const t = new three.AmbientLight("white", 1);
		this.scene.add(t);

	};

	getBlock = (pos: three.Vector3): Block | undefined => {
		const chunk = this.world.chunks[Math.floor((pos.y + 8) / 16) + 1][Math.floor((pos.x + 8) / 16) + 1][Math.floor((pos.z + 8) / 16) + 1];
		// console.log(pos.y % 16, pos.x % 16, pos.z % 16);
		return chunk.blocks[(pos.y % 16) + 16][(pos.x % 16) + 16][(pos.z % 16) + 16];
	};
}

export { Game };