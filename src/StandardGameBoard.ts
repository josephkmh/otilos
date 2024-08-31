import { Container } from "pixi.js";
import { STANDARD_BOARD } from "./gameBoards";
import { GameTile } from "./GameTile";
import { Vertex } from "./Vertex";

export class StandardGameBoard {
  private tiles: GameTile[] = [];
  private tilePlacements = STANDARD_BOARD;
  private vertices: Vertex[] = [];

  constructor(private container: Container) {
    this.tiles = this.placeTiles();
    this.placeVertices();
  }

  private placeTiles() {
    return this.tilePlacements.map((placement) => {
      return new GameTile(this.container, placement);
    });
  }

  private placeVertices() {
    this.tiles.forEach((tile) => {
      tile.getVertices().forEach((placement) => {
        if (
          !this.vertices.some(
            (vertex) =>
              vertex.coordinate.widthUnits === placement.widthUnits &&
              vertex.coordinate.heightUnits === placement.heightUnits
          )
        ) {
          this.vertices.push(new Vertex(this.container, placement));
        }
      });
    });
  }

  allowTileClicking() {
    this.tiles.forEach((tile) => {
      tile.sprite.interactive = true;
      tile.sprite.cursor = "pointer";
      tile.sprite.on("pointerdown", () => {
        console.log(`tile ${tile.placement}`);
      });
    });
  }

  removeTileClicking() {
    this.tiles.forEach((tile) => {
      tile.sprite.interactive = false;
      tile.sprite.cursor = "default";
      tile.sprite.removeAllListeners("pointerdown");
    });
  }
}
// for (let i = 0; i < POPULATED_VERTICES.length; i++) {
//   const [column, row] = POPULATED_VERTICES[i];
//   const tile = VertexSprite(container, Cache.get("dot"), i);
//   tile.x = column * VERTEX_HORIZONTAL_SPACING;
//   tile.y = row * VERTEX_VERTICAL_SPACING;
// }

// const centerDot = VertexSprite(container, Cache.get("dot"), 0);
// centerDot.x = 0;
// centerDot.y = 0;
