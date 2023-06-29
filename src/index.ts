import { game, resize, menu } from "./vars";

game.Init();
resize();
onresize = resize;

game.controls.addEventListener("lock", () => menu.style.display = "none");
game.controls.addEventListener("unlock", () => menu.style.display = "flex");

(menu.children[0] as HTMLInputElement).oninput = () => {
	game.camera.fov = parseInt((menu.children[0] as HTMLInputElement).value);
	game.camera.updateProjectionMatrix();

	(menu.children[1]).innerHTML = `fov: ${game.camera.fov}`;
};

addEventListener("click", async (e) => {
	if ((e.target as HTMLElement).classList.contains("container")) game.controls.lock();
});
addEventListener("contextmenu", (e) => e.preventDefault(), false);
addEventListener("mousemove", () => game.player.Hover());

addEventListener("mousedown", (e) => {
	if (game.paused) return;
	switch (e.button) {
		case 0: game.player.Break(); break;
		case 2: game.player.Place(); break;
	}
});


addEventListener("keydown", (e) => {
	if (game.keys[e.code]) return;
	game.keys[e.code] = true;

	game.player.setSpeed(e.code);

	if (e.code == "KeyQ") game.Debug();
});

addEventListener("keyup", (e) => {
	game.keys[e.code] = false;
	
	game.player.setSpeed(e.code, -1);
});

game.Start();