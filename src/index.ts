import { Application, Assets, Cache, Texture } from "pixi.js";
import { createBoardContainer } from "./Container";
import { StandardGameBoard } from "./StandardGameBoard";

export type HexagonalGridTilePlacement = [number, number];
export type GridCoordinate = {
  widthUnits: number;
  heightUnits: number;
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

  // TODO: calculate this based on tile placement
  const POPULATED_VERTICES = [
    [4, 4],
    [4, 2],
    [5, 1],
    [5, 5],
    [6, 2],
    [6, 4],
    [7, 1],
    [7, 5],
    [8, 2],
    [8, 4],
  ];

  // for (let i = 0; i < POPULATED_VERTICES.length; i++) {
  //   const [column, row] = POPULATED_VERTICES[i];
  //   const tile = VertexSprite(container, Cache.get("dot"), i);
  //   tile.x = column * VERTEX_HORIZONTAL_SPACING;
  //   tile.y = row * VERTEX_VERTICAL_SPACING;
  // }

  // const centerDot = VertexSprite(container, Cache.get("dot"), 0);
  // centerDot.x = 0;
  // centerDot.y = 0;
})();
