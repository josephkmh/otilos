import { Player } from './Player';

export class TurnManager {
  currentTurn: number;
  players: Player[];

  constructor(players: Player[]) {
    this.players = players;
    this.currentTurn = 0;
  }

  get currentPlayer() {
    return this.players[this.currentTurn % this.players.length];
  }

  getReadableCurrentTurnNumber() {
    return this.currentTurn + 1;
  }
}
