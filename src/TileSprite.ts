import { Polygon, Sprite, Texture } from "pixi.js";

export const TileSprite = (texture: Texture) => {
  const hexagonSprite = new Sprite(texture);
  hexagonSprite.anchor.set(0.5);

  const hexagonVertices = [
    0,
    -100,
    50 * Math.sqrt(3),
    -50,
    50 * Math.sqrt(3),
    50,
    0,
    100,
    -50 * Math.sqrt(3),
    50,
    -50 * Math.sqrt(3),
    -50,
  ];
  const hexagonHitArea = new Polygon(hexagonVertices);
  hexagonSprite.hitArea = hexagonHitArea;

  hexagonSprite.on("pointerenter", () => {
    hexagonSprite.alpha = 0.9;
  });

  hexagonSprite.on("pointerleave", () => {
    hexagonSprite.alpha = 1;
  });

  return hexagonSprite;
};
