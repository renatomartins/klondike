(function () {

  var cards = [];

  _.each(Card.SUITS, function (suit) {
    _.each(Card.RANKS, function (rank) {
      cards.push({
        rank: rank,
        suit: suit
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
