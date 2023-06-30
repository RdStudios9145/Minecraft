import * as three from "three";
import { game } from "../vars";

const AABB = (pos: three.Vector3, size: three.Vector3, pos2: three.Vector3, size2: three.Vector3): boolean => 
		pos.x + size.x / 2 >= pos2.x - size2.x / 2 &&
		pos.x - size.x / 2 <= pos2.x + size2.x / 2 &&
		pos.y + size.y / 2 >= pos2.y - size2.y / 2 &&
		pos.y - size.y / 2 <= pos2.y + size2.y / 2 &&
		pos.z + size.z / 2 >= pos2.z - size2.z / 2 &&
		pos.z - size.z / 2 <= pos2.z + size2.z / 2;

const playerWillPass = (pos: three.Vector3): boolean => {
	const vel = game.player.vel.clone().applyQuaternion(game.camera.quaternion);
	vel.setY(game.player.vel.y);
	const point = game.player.pos.clone().addScaledVector(vel, game.delta);
	// return point.x + 0.5 >= pos.x - 0.5 &&
	// 	point.x - 0.5 <= pos.x + 0.5 &&
	// 	point.y + 1 >= pos.y - 0.5 &&
	// 	point.y - 1 <= pos.y + 0.5 &&
	// 	point.z + 0.5 >= pos.z - 0.5 &&
	// 	point.z - 0.5 <= pos.z + 0.5;
	return AABB(point, new three.Vector3(1, 2, 1), pos, new three.Vector3(1, 1, 1));
};

const coll = (tan: three.Vector3) => {
	const dot = tan.dot(game.player.trueVel);
	// console.log(JSON.parse(JSON.stringify(tan)), JSON.parse(JSON.stringify(dot)), JSON.parse(JSON.stringify(game.player.trueVel.x * tan.x + game.player.trueVel.y * tan.y + game.player.trueVel.z * tan.z)));
	tan.multiplyScalar(dot);
	// console.log(JSON.parse(JSON.stringify(dot)), JSON.parse(JSON.stringify(tan)), JSON.parse(JSON.stringify(game.player.trueVel)));
	game.player.trueVel.sub(tan);
};

const handleCollision = (pos: three.Vector3) => {
	if (game.player.pos.x - 0.5 <= pos.x + 0.5)
		coll(new three.Vector3(1, 0, 0));
	else if (game.player.pos.x + 0.5 >= pos.x - 0.5)
		coll(new three.Vector3(-1, 0, 0));
	if (game.player.pos.y - 1 <= pos.y + 0.5)
		coll(new three.Vector3(0, 1, 0));
	else if (game.player.pos.y + 1 >= pos.y - 0.5)
		coll(new three.Vector3(0, -1, 0));
	if (game.player.pos.z - 0.5 <= pos.z + 0.5)
		coll(new three.Vector3(0, 0, 1));
	else if (game.player.pos.z + 0.5 >= pos.z - 0.5)
		coll(new three.Vector3(0, 0, -1));
};

export { AABB, playerWillPass, handleCollision };