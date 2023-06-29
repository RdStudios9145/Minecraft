import * as three from "three";
import { game } from "../vars";

const playerWillPass = (pos: three.Vector3): boolean => {
	const point = game.player.pos.addScaledVector(game.player.vel, game.delta);
	return point.x + 0.5 >= pos.x - 0.5 &&
		point.x - 0.5 <= pos.x + 0.5 &&
		point.y + 1 >= pos.y - 0.5 &&
		point.y - 1 <= pos.y + 0.5 &&
		point.z + 0.5 >= pos.z - 0.5 &&
		point.z - 0.5 <= pos.z + 0.5;
};

export { playerWillPass };