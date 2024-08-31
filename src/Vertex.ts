import { Cache, Container, Sprite } from "pixi.js";
import { GridCoordinate } from ".";
import { VertexSprite } from "./VertexSprite";
import { GRID_HEIGHT_UNIT, GRID_WIDTH_UNIT } from "./hexagonalGrid";

export class Vertex {
  public sprite: Sprite;

  constructor(container: Container, public coordinate: GridCoordinate) {
    console.log({ vertexPlacement: coordinate });
    this.sprite = VertexSprite(Cache.get("dot"));
    this.renderSprite(container);
  }

  renderSprite(container: Container) {
    this.sprite.x = this.coordinate.widthUnits * GRID_WIDTH_UNIT;
    this.sprite.y = this.coordinate.heightUnits * GRID_HEIGHT_UNIT;
    container.addChild(this.sprite);
    // tint black with 30% opacity
    this.sprite.alpha = 0.2;
    this.sprite.cursor = "pointer";

    this.sprite.on("pointerdown", () => {
      console.log(
        `vertex at ${this.coordinate.widthUnits},${this.coordinate.heightUnits}`
      );
    });

    this.sprite.on("pointerenter", () => {
      this.sprite.alpha = 0.5;
    });

    this.sprite.on("pointerleave", () => {
      this.sprite.alpha = 0.2;
    });
  }

  equals(other: Vertex) {
    return (
      this.coordinate.widthUnits === other.coordinate.widthUnits &&
      this.coordinate.heightUnits === other.coordinate.heightUnits
    );
  }
}
