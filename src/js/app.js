(function () {

  var ranks = [
    'ACE',
    'TWO',
    'THREE',
    'FOUR',
    'FIVE',
    'SIX',
    'SEVEN',
    'EIGHT',
    'NINE',
    'TEN',
    'JACK',
    'QUEEN',
    'KING'
  ];
  var suits = [
    'HEARTS',
    'CLUBS',
    'DIAMONDS',
    'SPADES'
  ];

  var cards = [];

  _.each(suits, function (suit) {
    _.each(ranks, function (rank) {
      cards.push({
        rank: Card[rank],
        suit: Card[suit]
      });
    });
  });

  cards = _.shuffle(cards);

  this.piles = [];
  _.times(7, function (n) {
    var pile = new PileView({
      el: '#pile' + (n+1),
      collection: new Cards(cards.splice(0, n+1))
    });
    this.piles.push(pile);
  });

  this.waste = new WasteView({
    el: '#waste',
    collection: new Cards()
  });

  this.deck = new DeckView({
    el: '#deck',
    collection: new Cards(cards)
  });

}());
