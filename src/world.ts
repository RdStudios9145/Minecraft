import { Chunk } from "./chunk";
import * as three from "three";

class World {
	/** YXZ order */
	// blocks: object = {};
	chunks: object = {};

	constructor() {
		this.chunks[0] = {};

		for (let x = 0; x < 2; x++) {
			this.chunks[0][x] = {};
			for (let z = 0; z < 2; z++)
				this.chunks[0][x][z] = new Chunk(new three.Vector3(x, 0, z));
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