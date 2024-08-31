import { Cache, Container, Text } from "pixi.js";
import { GridCoordinate, HexagonalGridTilePlacement, PixelPosition } from ".";
import { TileSprite } from "./TileSprite";
import { GRID_HEIGHT_UNIT, GRID_WIDTH_UNIT } from "./hexagonalGrid";

export class GameTile {
  placement: HexagonalGridTilePlacement;
  gridCoordinates: GridCoordinate;
  position?: PixelPosition;
  sprite: Container;

  constructor(container: Container, placement: HexagonalGridTilePlacement) {
    this.placement = placement;
    this.sprite = TileSprite(Cache.get("tile"));
    this.gridCoordinates = this.setGridCoordinates();
    this.renderSprite(container);
  }

  setGridCoordinates() {
    let columnOffset = 0;
    // if it's an odd row, offset the column by 1 width unit
    if (this.isOddRow()) {
      columnOffset = 1;
    }
    return {
      widthUnits: this.placement[0] * 2 + columnOffset,
      heightUnits: this.placement[1] * 3,
    };
  }

  renderSprite(container: Container) {
    this.sprite.x = this.gridCoordinates.widthUnits * GRID_WIDTH_UNIT;
    this.sprite.y = this.gridCoordinates.heightUnits * GRID_HEIGHT_UNIT;
    this.position = [this.sprite.x, this.sprite.y];
    container.addChild(this.sprite);

    // render a Text element with the placement on it at the center of the sprite
    const coordinateText = new Text({
      text: `${this.placement[0]},${this.placement[1]}`,
      style: { fill: "white" },
    });
    coordinateText.x = this.sprite.x;
    coordinateText.y = this.sprite.y;
    container.addChild(coordinateText);
  }

  isOddRow() {
    return Math.abs(this.placement[1]) % 2 === 1;
  }

  getVertices(): GridCoordinate[] {
    const topLeft: GridCoordinate = {
      widthUnits: this.gridCoordinates.widthUnits - 1,
      heightUnits: this.gridCoordinates.heightUnits - 1,
    };

    const topMiddle: GridCoordinate = {
      widthUnits: this.gridCoordinates.widthUnits,
      heightUnits: this.gridCoordinates.heightUnits - 2,
    };

    const topRight: GridCoordinate = {
      widthUnits: this.gridCoordinates.widthUnits + 1,
      heightUnits: this.gridCoordinates.heightUnits - 1,
    };

    const bottomRight: GridCoordinate = {
      widthUnits: this.gridCoordinates.widthUnits + 1,
      heightUnits: this.gridCoordinates.heightUnits + 1,
    };

    const bottomMiddle: GridCoordinate = {
      widthUnits: this.gridCoordinates.widthUnits,
      heightUnits: this.gridCoordinates.heightUnits + 2,
    };

    const bottomLeft: GridCoordinate = {
      widthUnits: this.gridCoordinates.widthUnits - 1,
      heightUnits: this.gridCoordinates.heightUnits + 1,
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
