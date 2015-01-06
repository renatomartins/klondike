var FoundationView = CardsView.extend({

  addCard: function () {
    CardsView.prototype.addCard.apply(this, arguments);
    var total = _.reduce(foundations, function (sum, foundation) {
      return sum + foundation.collection.length;
    }, 0);

    // check if the game is finished
    if (total === Card.RANKS.length * Card.SUITS.length) {
      alert('Yeah! :)');
      window.location.reload(false);
    }
  },


  isDroppable: function (rank, suit) {
    if (this.collection.isEmpty()) {
      // only allow the lowest rank, i.e. the ace
      return rank === Card.RANKS[0];
    }

    var topCard = this.collection.last();
    return topCard.isLowerRank(rank) && topCard.isSameSuit(suit);
  }

});
