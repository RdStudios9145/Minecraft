// import * as three from "three"

interface BlockType {
	id: number
	color: number
	texture: string[]
	gravity?: boolean
	// texture: three.Texture
}

const BlockTypes = {
	Grass: { id: 0, color: 0x90ff90, texture: ["grass", "grass_side"] } as BlockType,
	Stone: { id: 1, color: 0x808080, texture: ["stone", "stone_side"] } as BlockType,
	Sand:  { id: 2, color: 0xffd700, texture: ["sand", "sand_side"], gravity: true } as BlockType,
};

export { BlockTypes, BlockType };