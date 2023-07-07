import * as three from "three";
import { Block } from "./block";
import { BlockTypes } from "./block.types";
import * as Noise from "ts-perlin-simplex";
import { game, v30 } from "./vars";
import { AABB, handleCollision, playerWillPass } from "./physics/physics";

const noise = new Noise.SimplexNoise();
const range = (value = 0, min = 0, max = 16) => value * (max - min) + min;

class Chunk {
	// blocks: Record<number, Record<number, Record<number, Block | undefined>>> = {};
	/** YXZ Order */
	blocks: { [ID: number]: { [ID: number]: { [ID: number]: Block | undefined } } } = {};

	pos: three.Vector3 = null;

	// outline = null as three.BoxHelper;

	constructor(_pos: three.Vector3) {
		this.pos = _pos.clone();
		_pos.subScalar(7.5);

		for (let y = 0; y < 16; y++) {
			this.blocks[y] = {};
			for (let x = 0; x < 16; x++) {
				this.blocks[y][x] = {};
				for (let z = 0; z < 16; z++) {
					const p = (new three.Vector3(x, y, z)).add(_pos).multiplyScalar(1 / 100);
					const nVal = Math.floor(range((noise.noise(p.x, p.z) + 1) / 2, 0, 16)) - 0.5;
					if (y + _pos.y > nVal) continue;
					const block = new Block(new three.Vector3(x + _pos.x, y + _pos.y, z + _pos.z),
						y + _pos.y == nVal ? BlockTypes.Grass : BlockTypes.Stone);
					if (y + _pos.y == nVal)
						game.scene.add(block.cube);
					this.blocks[y][x][z] = block;
				}
			}
		}

		// const outline = new three.BoxHelper(new three.Mesh(new three.BoxGeometry(16, 16, 16), new three.MeshBasicMaterial({ color: 0xffffff })));
		// outline.position.set(this.pos.x, this.pos.y, this.pos.z);
		// game.scene.add(outline);
		// console.log(JSON.parse(JSON.stringify(this.pos)), JSON.parse(JSON.stringify(_pos.subScalar(.5))), JSON.parse(JSON.stringify(outline.position)));

		// const box = new three.Mesh(new three.BoxGeometry(), new three.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
		// box.position.set(this.pos.x + 1, this.pos.y + 15, this.pos.z);
		// game.scene.add(box);
		// const box2 = new three.Mesh(new three.BoxGeometry(), new three.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
		// box2.position.set(this.pos.x, this.pos.y + 15, this.pos.z);
		// game.scene.add(box2);
	}
	

	Debug = (debug: boolean) => {
		for (const y of Object.keys(this.blocks))
			for (const x of Object.keys(this.blocks[y]))
				for (const z of Object.keys(this.blocks[y][x]))
					try { this.blocks[y][x][z].wireframe = debug; } catch {}
	};

	Update = () => {
		// let grounded = false;
		let velSet = false;
		// let closest = Infinity;
		// let closestPos = null;
		if (!AABB(this.pos, new three.Vector3(16, 16, 16), game.player.pos, new three.Vector3(1, 2, 1))) return;

		game.player.trueVel = v30.clone();
		game.player.calcTrueVel();

		for (const y of Object.keys(this.blocks))
			for (const x of Object.keys(this.blocks[y]))
				for (const z of Object.keys(this.blocks[y][x])) {
					const block = this.blocks[y][x][z];
					if (block === null || block === undefined) continue;
					// if (game.player.pos.distanceTo(block.pos) < closest) { closest = game.player.pos.distanceTo(block.pos); closestPos = [z, y, z]; }
					// console.log(game.player.pos.distanceTo(this.blocks[y][x][z].pos), this.blocks[y][x][z].pos.x, this.blocks[y][x][z].pos.y, this.blocks[y][x][z].pos.z , " | ", game.player.pos.x, game.player.pos.y, game.player.pos.z, " | ", x, y, z, " | ", parseInt(x) + parseInt(this.pos.x as unknown as string), parseInt(y) + this.pos.y, parseInt(z) + this.pos.z);
					if (game.player.pos.distanceTo(block.pos) <= 2) {
						const collide = playerWillPass(block.pos);
						if (collide) {
							velSet = true;
							handleCollision(block.pos);
							// console.log("collision");
						}
					}
				}
		// game.player.grounded = grounded;
		// console.log("Closest:", closest, closestPos);
		game.player.velSet = velSet;
	};
}

export { Chunk };