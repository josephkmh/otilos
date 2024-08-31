import { Cache, Container, Text } from "pixi.js";
import {
  GridCoordinates,
  HexagonalGridTileCoordinates,
  PixelPosition,
} from "..";
import { TileSprite } from "../Sprites/TileSprite";
import { GRID_HEIGHT_UNIT, GRID_WIDTH_UNIT } from "../hexagonalGrid";

export class GameTile {
  placement: HexagonalGridTileCoordinates;
  gridCoordinates: GridCoordinates;
  position?: PixelPosition;
  sprite: Container;

  constructor(container: Container, placement: HexagonalGridTileCoordinates) {
    this.placement = placement;
    this.sprite = TileSprite(Cache.get("tile"));
    this.gridCoordinates = this.calculateGridCoordinates();
    this.renderSprite(container);
  }

  private calculateGridCoordinates(): GridCoordinates {
    let columnOffset = 0;
    // if it's an odd row, offset the column by 1 width unit
    if (this.isOddRow()) {
      columnOffset = 1;
    }
    return {
      column: this.placement.column * 2 + columnOffset,
      row: this.placement.row * 3,
    };
  }

  renderSprite(container: Container) {
    this.sprite.x = this.gridCoordinates.column * GRID_WIDTH_UNIT;
    this.sprite.y = this.gridCoordinates.row * GRID_HEIGHT_UNIT;
    this.position = [this.sprite.x, this.sprite.y];
    container.addChild(this.sprite);

    // render a Text element with the placement on it at the center of the sprite
    const coordinateText = new Text({
      text: `${this.placement.column},${this.placement.row}`,
      style: { fill: "white" },
    });
    coordinateText.x = this.sprite.x;
    coordinateText.y = this.sprite.y;
    container.addChild(coordinateText);
  }

  isOddRow() {
    return Math.abs(this.placement.row) % 2 === 1;
  }

  gridKey() {
    return `${this.gridCoordinates.column},${this.gridCoordinates.row}`;
  }

  hexGridKey() {
    return `${this.placement.column},${this.placement.row}`;
  }

  getVertices(): GridCoordinates[] {
    const topLeft: GridCoordinates = {
      column: this.gridCoordinates.column - 1,
      row: this.gridCoordinates.row - 1,
    };

    const topMiddle: GridCoordinates = {
      column: this.gridCoordinates.column,
      row: this.gridCoordinates.row - 2,
    };

    const topRight: GridCoordinates = {
      column: this.gridCoordinates.column + 1,
      row: this.gridCoordinates.row - 1,
    };

    const bottomRight: GridCoordinates = {
      column: this.gridCoordinates.column + 1,
      row: this.gridCoordinates.row + 1,
    };

    const bottomMiddle: GridCoordinates = {
      column: this.gridCoordinates.column,
      row: this.gridCoordinates.row + 2,
    };

    const bottomLeft: GridCoordinates = {
      column: this.gridCoordinates.column - 1,
      row: this.gridCoordinates.row + 1,
    };

    return [
      topLeft,
      topMiddle,
      topRight,
      bottomRight,
      bottomMiddle,
      bottomLeft,
    ];
  }
}
