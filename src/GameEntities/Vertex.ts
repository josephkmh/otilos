import { Cache, Container, Sprite } from "pixi.js";
import { GridCoordinates } from "..";
import { VertexSprite } from "../Sprites/VertexSprite";
import { GRID_HEIGHT_UNIT, GRID_WIDTH_UNIT } from "../hexagonalGrid";

export class Vertex {
  public sprite: Sprite;

  constructor(container: Container, public coordinates: GridCoordinates) {
    console.log({ vertexPlacement: coordinates });
    this.sprite = VertexSprite(Cache.get("dot"));
    this.renderSprite(container);
  }

  renderSprite(container: Container) {
    this.sprite.x = this.coordinates.x * GRID_WIDTH_UNIT;
    this.sprite.y = this.coordinates.y * GRID_HEIGHT_UNIT;
    container.addChild(this.sprite);
    // tint black with 30% opacity
    this.sprite.alpha = 0.4;
    this.sprite.cursor = "pointer";

    this.sprite.on("pointerdown", () => {
      console.log(`vertex at ${this.coordinates.x},${this.coordinates.y}`);
    });

    this.sprite.on("pointerenter", () => {
      this.sprite.alpha = 0.7;
    });

    this.sprite.on("pointerleave", () => {
      this.sprite.alpha = 0.4;
    });
  }

  equals(other: Vertex) {
    return (
      this.coordinates.x === other.coordinates.x &&
      this.coordinates.y === other.coordinates.y
    );
  }
}
