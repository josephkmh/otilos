import { Application, Container } from "pixi.js";

export function createBoardContainer(app: Application) {
  const container = new Container();
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;
  container.pivot.x = 0;
  container.pivot.y = 0;
  app.stage.addChild(container);
  return container;
}
