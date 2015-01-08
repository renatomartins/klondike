(function () {

  var moveCount = 1;

  var cards = [];

  _.each(Card.SUITS, function (suit) {
    _.each(Card.RANKS, function (rank) {
      cards.push(new Card({
        rank: rank,
        suit: suit
      }));
    });
  });

  cards = _.shuffle(cards);

  _.times(7, function (n) {
    new CardsView({
      el: '#pile' + (n+1),
      collection: new Pile(cards.splice(0, n+1))
    });
  });

  this.waste = new Waste([], {moveCount: moveCount});
  new WasteView({
    el: '#waste',
    collection: this.waste
  });

  this.deck = new Deck(cards, {moveCount: moveCount});
  new DeckView({
    el: '#deck',
    collection: this.deck
  });

  this.foundations = [];
  _.times(4, function (n) {
    var foundation = new Foundation();
    this.foundations.push(foundation);
    new CardsView({
      el: '#foundation' + (n+1),
      collection: foundation
    });
  });

}());
