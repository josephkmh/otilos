import { GridCoordinates, HexagonalGridTileCoordinates } from './types';

export class AbstractGameTile {
  placement: HexagonalGridTileCoordinates;
  gridCoordinates: GridCoordinates;

  constructor(placement: HexagonalGridTileCoordinates) {
    this.placement = placement;
    this.gridCoordinates = this.calculateGridCoordinates();
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
