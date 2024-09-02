import { Cache, Container, Sprite } from "pixi.js";
import { GridCoordinates, HexagonalGridTileCoordinates } from "..";
import { VertexSprite } from "../Sprites/VertexSprite";
import { GRID_HEIGHT_UNIT, GRID_WIDTH_UNIT } from "../hexagonalGrid";

type VertexType = "top" | "bottom" | undefined;

export class Vertex {
  public sprite: Sprite;
  public adjacentTileCoordinates: HexagonalGridTileCoordinates[] = [];
  public type: VertexType;

  constructor(container: Container, public coordinates: GridCoordinates) {
    this.sprite = VertexSprite(Cache.get("dot"));
    this.type = this.calculateVertextType();
    this.adjacentTileCoordinates = this.calculateAdjacentTileCoordinates();
    this.renderSprite(container);
  }

  calculateVertextType() {
    const remainderBy3 = this.coordinates.row % 3;
    if (remainderBy3 === 1 || remainderBy3 === -2) {
      return "top";
    } else if (remainderBy3 === 2 || remainderBy3 === -1) {
      return "bottom";
    } else {
      throw new Error(
        `Invalid vertex type at ${this.coordinates.column},${this.coordinates.row}`
      );
    }
  }

  calculateAdjacentTileCoordinates(): HexagonalGridTileCoordinates[] {
    if (this.type === "top") {
      return [
        { column: this.coordinates.column - 1, row: this.coordinates.row - 1 },
        { column: this.coordinates.column + 1, row: this.coordinates.row - 1 },
        { column: this.coordinates.column, row: this.coordinates.row + 2 },
      ];
    } else {
      return [
        { column: this.coordinates.column, row: this.coordinates.row - 2 },
        { column: this.coordinates.column + 1, row: this.coordinates.row + 1 },
        { column: this.coordinates.column - 1, row: this.coordinates.row + 1 },
      ];
    }
  }

  renderSprite(container: Container) {
    this.sprite.x = this.coordinates.column * GRID_WIDTH_UNIT;
    this.sprite.y = this.coordinates.row * GRID_HEIGHT_UNIT;
    container.addChild(this.sprite);
    // tint black with 30% opacity
    this.sprite.alpha = 0.2;
    this.sprite.cursor = "pointer";

    this.sprite.on("pointerdown", () => {
      console.log(
        `${this.type} vertex at row${this.coordinates.row},column${this.coordinates.column}`
      );
      console.log(`Adjacent tiles:`, this.adjacentTileCoordinates);
    });

    this.sprite.on("pointerenter", () => {
      this.sprite.alpha = 0.7;
    });

    this.sprite.on("pointerleave", () => {
      this.sprite.alpha = 0.2;
    });
  }

  equals(other: Vertex) {
    return this.key === other.key;
  }

  key() {
    return `${this.coordinates.column},${this.coordinates.row}`;
  }
}
