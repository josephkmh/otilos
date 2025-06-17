import { Player } from './Player';
import { TurnManager } from './TurnManager';

export class Game {
  players: Player[];
  TurnManager: TurnManager;

  constructor(players: Player[]) {
    this.players = players;
    this.TurnManager = new TurnManager(players);
  }
}
