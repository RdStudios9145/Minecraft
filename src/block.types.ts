// import * as three from "three"

interface BlockType {
	id: number
	color: number
	texture: string[]
	solid: boolean
	gravity?: boolean
	transparent?: boolean
	// texture: three.Texture
}

const BlockTypes = {
	Grass: { id: 0, color: 0x90ff90, texture: ["grass", "grass_side"], solid: true } as BlockType,
	Stone: { id: 1, color: 0x808080, texture: ["stone", "stone_side"], solid: true } as BlockType,
	Sand:  { id: 2, color: 0xffd700, texture: ["sand", "sand_side"], solid: true, gravity: true } as BlockType,
};

export { BlockTypes, BlockType };