var Card = Backbone.Model.extend({

  defaults: {
    visible: false
  },


  matchesSuit: function (suit) {
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
  },


  // tells the view to add a visual hint that the card a good target
  switchDroppable: function (value) {
    this.trigger('switch-droppable', value);
  }

}, {

  RANKS: [
    'A', '2', '3', '4', '5', '6', '7',
    '8', '9', '10', 'J', 'Q', 'K'
  ],

  SUITS: ['hearts', 'clubs', 'diamonds', 'spades'],

  getRankIndex: function (rank) {
    return this.RANKS.indexOf(rank);
  },

  getSuitIndex: function (suit) {
    return this.SUITS.indexOf(suit);
  }

});
