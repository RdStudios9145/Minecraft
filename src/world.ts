import { Chunk } from "./chunk";
import * as three from "three";

class World {
	/** YXZ order */
	// blocks: object = {};
	chunks: { [ID: number]: { [ID: number]: { [ID: number]: Chunk } } } = {};

	constructor() {
		for (let y = 0; y < 2; y++) {
			this.chunks[y] = {};
			for (let x = 0; x < 2; x++) {
				this.chunks[y][x] = {};
				for (let z = 0; z < 2; z++)
					this.chunks[y][x][z] = new Chunk(new three.Vector3(x * 16, y * 16, z * 16));
			}
		}
	}
	

	Debug = (debug: boolean) => {
		for (const y in Object.keys(this.chunks))
			for (const x in Object.keys(this.chunks[y]))
				for (const z in Object.keys(this.chunks[y][x]))
					this.chunks[y][x][z].Debug(debug);
	};

	Update = () => {
		for (const y in Object.keys(this.chunks))
			for (const x in Object.keys(this.chunks[y]))
				for (const z in Object.keys(this.chunks[y][x]))
					this.chunks[y][x][z].Update();
	};
}

export { World };