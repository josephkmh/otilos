import { Circle, Sprite, Texture } from "pixi.js";

export const VertexSprite = (texture: Texture) => {
  const vertexSprite = new Sprite(texture);

  vertexSprite.scale.set(0.7);
  vertexSprite.anchor.set(0.5);

  const hexagonHitArea = new Circle(0, 0, 30);
  vertexSprite.hitArea = hexagonHitArea;
  vertexSprite.interactive = true;

  return vertexSprite;
};
