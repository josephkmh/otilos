import { AbstractGameTile } from "@otilos/common-game-logic/AbstractGameTile";
import { Cache, Container, Text } from "pixi.js";
import { HexagonalGridTileCoordinates, PixelPosition } from "..";
import { TileSprite } from "../Sprites/TileSprite";
import { GRID_HEIGHT_UNIT, GRID_WIDTH_UNIT } from "../hexagonalGrid";

export class GameTile extends AbstractGameTile {
  position?: PixelPosition;
  sprite: Container;

  constructor(container: Container, placement: HexagonalGridTileCoordinates) {
    super(placement);
    this.sprite = TileSprite(Cache.get("tile"));
    this.renderSprite(container);
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
    coordinateText.x = this.sprite.x - coordinateText.width / 2;
    coordinateText.y = this.sprite.y - coordinateText.height / 2;
    container.addChild(coordinateText);
  }
}
