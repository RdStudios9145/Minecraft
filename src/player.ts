import * as three from "three";
import { Block } from "./block";
import { game, keyCodes, v30 } from "./vars";
// import * as cannon from "cannon";
import { BlockTypes } from "./block.types";

class Player {
	pos = new three.Vector3(0, 16, 0);
	vel = new three.Vector3(0, 0, 0);
	trueVel = new three.Vector3(0, 0, 0);
	speed = .8;
	grounded = false;
	velSet = false;

	camera = null as three.PerspectiveCamera;

	outline = null as three.BoxHelper;

	// rigidbody = null as cannon.Body;

	constructor(cam: three.PerspectiveCamera) {
		this.camera = cam;
		// this.rigidbody = new cannon.Body({
		// 	mass: 1,
		// 	position: new cannon.Vec3(this.pos.x, this.pos.y, this.pos.z),
		// 	shape: new cannon.Box(new cannon.Vec3(0.5, 1, 0.5)),
		// });
		// game.physicsWorld.addBody(this.rigidbody);
	}

	calcTrueVel = () => {
		const x = this.vel.x, z = this.vel.z;
		const dir = (new three.Vector3(x, 0, z)).applyQuaternion(this.camera.quaternion);
		dir.setY(this.vel.y);
		dir.normalize();
		if (!this.grounded)
			dir.setY(dir.y - 0.1);
		// console.log(dir.y, this.grounded);
		this.trueVel = dir;
	};

	UpdateSurroundingBlocks = (pos: three.Vector3) => {
		
	};

	rayCast = () => {
		const raycaster = new three.Raycaster(this.camera.position, (new three.Vector3(0, 0, -1)).applyQuaternion(this.camera.quaternion), 0, 10);
		const intersect = raycaster.intersectObjects(game.scene.children.filter((obj) => obj.type == "Mesh"));
		// console.log(intersect)
		return intersect[0];
	};

	Break = () => {
		const intersect = this.rayCast();
		if (intersect === undefined) return;

		game.scene.remove(intersect.object);

		const pos = intersect.object.position;
		// console.log(game.world.chunks[0][0][0].blocks.length)
		try { game.world.chunks[0][0][0].blocks[pos.y][pos.x][pos.z] = null; } catch {}

		this.Hover();

		this.UpdateSurroundingBlocks(pos);
	};

	Place = () => {
		const intersect = this.rayCast();
		if (intersect === undefined) return;

		const face = intersect.face;
		const pos = new three.Vector3().addVectors(intersect.object.position, face.normal);
		const block = new Block(pos, BlockTypes.Sand);
		game.scene.add(block.cube);
		try { game.world.chunks[0][0][0].blocks[pos.y][pos.x][pos.z] = block; } catch {}

		this.UpdateSurroundingBlocks(intersect.object.position);
	};

	Hover = () => {
		const intersect = this.rayCast();
		if (intersect === undefined) {
			if (this.outline != null) {
				game.scene.remove(this.outline);
				this.outline.dispose();
			}
			this.outline = null;
			return;
		}

		if (this.outline === null) {
			const box = new three.BoxHelper(intersect.object, 0xffffffaf);
			game.scene.add(box);
			this.outline = box;
			return;
		}

		this.outline.setFromObject(intersect.object);
		this.outline.update();
	};

	Update = (delta: number) => {
		// this.pos = this.pos.addVectors(this.pos, this.vel)
		if (!this.velSet) {
			this.calcTrueVel();
		}

		// console.log("vel", JSON.parse(JSON.stringify(this.trueVel)), JSON.parse(JSON.stringify(this.pos)));
		
		this.pos.addScaledVector(this.trueVel, delta);
		// console.log("vel", JSON.parse(JSON.stringify(this.trueVel)), JSON.parse(JSON.stringify(this.pos)));
		this.trueVel.multiplyScalar(0);
		// this.camera.position.set(this.pos.x, this.pos.y + 1, this.pos.z);

		if (this.vel != v30) this.Hover();

		// updatePositions(this.pos, this.rigidbody.position);
		// this.rigidbody.position.x = this.pos.x;
		// this.rigidbody.position.y = this.pos.y;
		// this.rigidbody.position.z = this.pos.z;
		// this.rigidbody.quaternion.x = this.camera.quaternion.x;
		// this.rigidbody.quaternion.y = this.camera.quaternion.y;
		// this.rigidbody.quaternion.z = this.camera.quaternion.z;
		// this.rigidbody.quaternion.w = this.camera.quaternion.w;
		// game.physicsWorld.step(1.0 / 60.0, delta, 3);
		// this.pos.x = this.rigidbody.position.x;
		// this.pos.y = this.rigidbody.position.y;
		// this.pos.z = this.rigidbody.position.z;
		// this.camera.quaternion.x = this.rigidbody.quaternion.x;
		// this.camera.quaternion.y = this.rigidbody.quaternion.y;
		// this.camera.quaternion.z = this.rigidbody.quaternion.z;
		// this.camera.quaternion.w = this.rigidbody.quaternion.w;
		// updatePositions(this.rigidbody.position, this.pos);

		// console.log(this.vel)
	};

	setSpeed = (key: string, mult = 1) => {
		// D, A, S, W, Space, Shift
		// +X -> Right
		// -X -> Left
		// +Z -> Backward
		// -Z -> Forward
		switch (key.toLowerCase()) {
			case keyCodes[0]: if (!(!game.keys[key] && !game.keys[keyCodes[1]] && this.vel.equals(v30))) this.vel.x += mult * this.speed; break;
			case keyCodes[1]: if (!(!game.keys[key] && !game.keys[keyCodes[0]] && this.vel.equals(v30))) this.vel.x -= mult * this.speed; break;
			case keyCodes[2]: if (!(!game.keys[key] && !game.keys[keyCodes[3]] && this.vel.equals(v30))) this.vel.z += mult * this.speed; break;
			case keyCodes[3]: if (!(!game.keys[key] && !game.keys[keyCodes[2]] && this.vel.equals(v30))) this.vel.z -= mult * this.speed; break;
			case keyCodes[4]: if (!(!game.keys[key] && !game.keys[keyCodes[5]] &&
				!game.keys[keyCodes[6]] && this.vel.equals(v30))) this.vel.y += mult * this.speed; break;
			// case keyCodes[5]: if (!(!game.keys[key] && !game.keys[keyCodes[4]] && this.vel.equals(v30))) this.vel.y -= mult * this.speed; break;
			// case keyCodes[6]: if (!(!game.keys[key] && !game.keys[keyCodes[4]] && this.vel.equals(v30))) this.vel.y -= mult * this.speed; break;
		}
	};
}

export { Player };