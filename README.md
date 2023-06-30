# Minecraft

Hello

I open sourced this now

Build with webpack or play [here](https://minecraft.rdstudios.repl.co) (Warning: The online version will be behind this repo, for the most up-to-date version, it is recommended that you build this on your local computer)

## ToC

1. [ToC](#toc)
1. [How to build](#how-to-build)
1. [How you can help](#how-you-can-help)
1. [Documentation](#docs)
1. [Stuff I'll probably add](#stuff-ill-probably-add)
1. [Stuff I'm in the process of adding](#stuff-im-in-the-process-of-adding)

## How to build

1. Install the repo on your computer with `git https://github.com/RdStudios9145/Minecraft.git`
2. Install the node modules required with `npm i` or `npm install`
3. Build the `bundle.js` with `npx webpack` (`npx webpack --watch` is recomended if you are developing)
4. Host the files
	- The VSCode extension 'Live Server' is recommended for this step, but not required
	- Image URLs will not work if you open the `index.html` file directly in your browser

## How you can help

If you know about physics, I would like assistance with the physics engine

You can also just, like, submit prs or issues (Preferably PRs, fixing bugs is hard)

## Docs

This is the most documentation I'll write for this for a while. You can submit PR's to improve this if you want.

### General Info

This is written in Typescript, compiled down to Javascript with webpack, and included in a html file.

### Files

 - `block.ts`: All the code for all the blocks. No block-specific code, a general class that stores information about the block.
 - `block.types.ts`: All the block specific information passed to the block class.
 - `chunk.ts`: Chunks that contain blocks and run collision detection for the blocks and the player.
 - `game.ts`: The game class. This is instantiated first and instanciates the needed classes such as the three.js world and the game world. It also contains all of the objects, such as the camera and the player. This class doesn't do much on its own.
 - `index.ts`: The index file. Sets up all the event listeners and calles game.Init and game.Start.
 - `player.ts`: The player class.
 - `vars.ts`: Contains and exposes all the global vars, such as game and v30.
 - `world.ts`: The game world. Contains and updates the chunks.

## Stuff I'll probably add

1. Good physics
1. Multiplayer
1. World saves

## Stuff Im in the process of adding

1. Physics