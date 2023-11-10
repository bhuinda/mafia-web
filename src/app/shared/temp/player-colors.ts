enum Colors { // TODO: Add corresponding hexidecimal values
  Red,
  Blue,
  Cyan,
  Purple,
  Yellow,
  Orange,
  Green,
  Lavender,
  Magenta,
  Gray,
  Forest,
  Brown,
  Mint,
  Black,
  Pink,

  Default // For exception of 0 players; id should never return 0.
}

export class PlayerColors {
  getColor(id: number) {
    switch(id) {
      case 1: return Colors.Red;
      case 2: return Colors.Blue;
      case 3: return Colors.Cyan;
      case 4: return Colors.Purple;
      case 5: return Colors.Yellow;
      case 6: return Colors.Orange;
      case 7: return Colors.Green;
      case 8: return Colors.Lavender;
      case 9: return Colors.Magenta;
      case 10: return Colors.Gray;
      case 11: return Colors.Forest;
      case 12: return Colors.Brown;
      case 13: return Colors.Mint;
      case 14: return Colors.Black;
      case 15: return Colors.Pink;
      default: return Colors.Default;
    }
  }
}
