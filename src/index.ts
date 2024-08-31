import { Application, Assets, Cache, Texture } from "pixi.js";
import { createBoardContainer } from "./createBoardContainer";
import { StandardGameBoard } from "./GameEntities/StandardGameBoard";

export type HexagonalGridTileCoordinates = {
  row: number;
  column: number;
};
export type GridCoordinates = {
  column: number;
  row: number;
};
export type PixelPosition = [number, number];

async function loadAssetCache() {
  await Assets.load("./assets/green_tile.png");
  Cache.set("tile", Texture.from("./assets/green_tile.png"));

  await Assets.load("./assets/dot.png");
  Cache.set("dot", Texture.from("./assets/dot.png"));
}

// Asynchronous IIFE
(async () => {
  // Create a PixiJS application.
  const app = new Application();

  await loadAssetCache();

  // Intialize the application.
  await app.init({ background: "#1099bb", resizeTo: window });
  document.body.appendChild(app.canvas);
  const container = createBoardContainer(app);

  const gameBoard = new StandardGameBoard(container);

  gameBoard.allowTileClicking();
})();
