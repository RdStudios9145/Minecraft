import * as three from "three";
import { Block } from "./block";
import { BlockTypes } from "./block.types";
import * as Noise from "perlin-simplex";
import { game, v30 } from "./vars";
import { playerWillPass } from "./physics/physics";

const noise = new Noise.SimplexNoise();
const range = (value = 0, min = 0, max = 16) => value * (max - min) + min;

class Chunk {
	blocks: object = {};

	pos: three.Vector3 = null;

	constructor(_pos: three.Vector3) {
		this.pos = _pos;
		_pos.multiplyScalar(16);

		for (let y = 0; y < 16; y++) {
			this.blocks[y] = {};
			for (let x = 0; x < 16; x++) {
				this.blocks[y][x] = {};
				for (let z = 0; z < 16; z++) {
					const p = (new three.Vector3(x, y, z)).add(_pos).multiplyScalar(1 / 100);
					if (y > Math.floor(range((noise.noise(p.x, p.z) + 1) / 2, 0, 16))) continue;
					const block = new Block(v30.multiplyVectors(p, new three.Vector3(100, 100, 100)),
						y == Math.floor(range((noise.noise(p.x, p.z) + 1) / 2, 0, 16)) ? BlockTypes.Grass : BlockTypes.Stone);
					this.blocks[y][x][z] = block;
				}
			}
		}
	}

	Debug = (debug: boolean) => {
		for (const y of Object.keys(this.blocks))
			for (const x of Object.keys(this.blocks[y]))
				for (const z of Object.keys(this.blocks[y][x]))
					try { this.blocks[y][x][z].wireframe = debug; } catch {}
	};

	Update = () => {
		let grounded = false;
		for (const y of Object.keys(this.blocks))
			for (const x of Object.keys(this.blocks[y]))
				for (const z of Object.keys(this.blocks[y][x])) {
					if (this.blocks[y][x][z] === null) continue;
					if ((this.blocks[y][x][z] as Block).pos.distanceTo(game.player.pos) <= 2) {
						const collide = playerWillPass((this.blocks[y][x][z] as Block).pos);
						if (collide) {
							grounded = true;
							game.player.vel = v30.clone();
							console.log("collision");
						}
					}
				}
		game.player.grounded = grounded;
	};
}

export { Chunk };