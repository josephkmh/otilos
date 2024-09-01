import { Container } from "pixi.js";
import { STANDARD_BOARD } from "../gameBoards";
import { GameTile } from "./GameTile";
import { Vertex } from "./Vertex";

export class StandardGameBoard {
  private tiles: GameTile[] = [];
  private tilePlacements = STANDARD_BOARD;
  private vertices: Vertex[] = [];

  constructor(private container: Container) {
    this.placeTiles();
    this.placeVertices();
  }

  private placeTiles() {
    this.tiles = this.tilePlacements.map((placement) => {
      return new GameTile(this.container, placement);
    });
  }

  private placeVertices() {
    this.tiles.forEach((tile) => {
      tile.getVertices().forEach((placement) => {
        if (
          !this.vertices.some(
            (vertex) =>
              vertex.coordinates.column === placement.column &&
              vertex.coordinates.row === placement.row
          )
        ) {
          const vertex = new Vertex(this.container, placement);
          // TODO: this is just proof of concept. Should probably store tiles in a map by coordinate key for quick lookup.
          vertex.sprite.on("pointerenter", () => {
            this.tiles.forEach((tile) => {
              if (
                vertex.adjacentTileCoordinates.some(
                  (adjacentTile) =>
                    adjacentTile.row === tile.gridCoordinates.row &&
                    adjacentTile.column === tile.gridCoordinates.column
                )
              ) {
                tile.sprite.alpha = 0.5;
              }
            });
          });
          vertex.sprite.on("pointerleave", () => {
            this.tiles.forEach((tile) => {
              if (
                vertex.adjacentTileCoordinates.some(
                  (adjacentTile) =>
                    adjacentTile.row === tile.gridCoordinates.row &&
                    adjacentTile.column === tile.gridCoordinates.column
                )
              ) {
                tile.sprite.alpha = 1;
              }
            });
          });
          this.vertices.push(vertex);
        }
      });
    });
  }

  allowTileClicking() {
    this.tiles.forEach((tile) => {
      tile.sprite.interactive = true;
      tile.sprite.cursor = "pointer";
      tile.sprite.on("pointerdown", () => {
        console.log(
          `tile at ${tile.placement.column},${tile.placement.row}, grid coordinates: row${tile.gridCoordinates.row},column${tile.gridCoordinates.column}`
        );
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
