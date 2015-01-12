var Card = Backbone.Model.extend({

  defaults: {
    visible: false,
    draggable: false
  },


  isVisible: function () {
    return this.get('visible');
  },


  isDraggable: function () {
    return this.get('draggable');
  },


  isTopCard: function () {
    return this === this.collection.last();
  },


  isSameSuit: function (suit) {
    return this.get('suit') === suit;
  },


  // is alternate suit if the sum of the indexes is an odd number
  isAlternateSuit: function (suit) {
    return (this.getSuitIndex() + Card.getSuitIndex(suit)) % 2 != 0;
  },


  isHigherRank: function (rank) {
    return this.getRankIndex() - Card.getRankIndex(rank) === 1;
  },


  isLowerRank: function (rank) {
    return this.getRankIndex() - Card.getRankIndex(rank) === -1;
  },


  getSuitIndex: function () {
    return Card.getSuitIndex(this.get('suit'));
  },


  getRankIndex: function () {
    return Card.getRankIndex(this.get('rank'));
  }

}, {

  RANKS: [
    'A', '2', '3', '4', '5', '6', '7',
    '8', '9', '10', 'J', 'Q', 'K'
  ],


  SUITS: ['hearts', 'clubs', 'diamonds', 'spades'],


  getDeck: function () {
    var cards = [];
    _.each(this.SUITS, function (suit) {
      _.each(this.RANKS, function (rank) {
        cards.push(new Card({rank: rank, suit: suit}));
      });
    }, this);
    return cards;
  },


  getShuffledDeck: function () {
    var cards = this.getDeck();
    // merge another deck according to settings
    if (settings.get('doubleDeck'))
      Array.prototype.push.apply(cards, this.getDeck());
    return _.shuffle(cards);
  },


  getRankIndex: function (rank) {
    return this.RANKS.indexOf(rank);
  },


  getSuitIndex: function (suit) {
    return this.SUITS.indexOf(suit);
  }

});
