import * as three from "three";
import { Game } from "./game";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const menu = <HTMLDivElement>document.getElementById("settings");

const c = canvas?.getContext("webgl2");

const keyCodes = ["keyd", "keya", "keys", "keyw", "space", "shiftright", "shiftleft"];

let WIDTH = 800, HEIGHT = 700;

const v30 = new three.Vector3(0, 0, 0);

const resize = () => {
	WIDTH = innerWidth, HEIGHT = innerHeight;
	game.camera.aspect = WIDTH / HEIGHT;
	game.camera.updateProjectionMatrix();
	game.renderer.setSize(WIDTH, HEIGHT);
};

const deg2Rad = (deg: number): number => deg * Math.PI / 180;
const rad2Deg = (rad: number): number => rad * 180 * Math.PI;

const game = new Game();

export { canvas, c, menu, keyCodes, WIDTH, HEIGHT, v30, resize, deg2Rad, rad2Deg, game };