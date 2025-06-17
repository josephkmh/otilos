type PlayerColor = 'red' | 'blue' | 'green' | 'yellow';

export class Player {
  color: PlayerColor;
  username: string;

  constructor(username: string, color: PlayerColor) {
    this.username = username;
    this.color = color;
  }
}
