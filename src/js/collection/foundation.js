var Foundation = Cards.extend({

  initialize: function () {
    this.on('add', this.onAdd);
  },


  onAdd: function (model) {
    // check if all foundations are complete
    var isComplete = _.all(foundations, function (foundation) {
      return foundation.length === Card.RANKS.length;
    });

    if (isComplete) {
      alert('Yeah! :)');
      window.location.reload(false);;
    }
  },


  isDroppable: function (rank, suit) {
    if (this.isEmpty())
      return rank === _.first(Card.RANKS);

    var topCard = this.last();
    return topCard.isLowerRank(rank) && topCard.isSameSuit(suit);
  }
  
});
