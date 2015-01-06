var PileView = CardsView.extend({

  render: function () {
    this.collection.last().set('visible', true);
    CardsView.prototype.render.apply(this);
    return this;
  },


  removeCard: function () {
    CardsView.prototype.removeCard.apply(this, arguments);
    // when a card is moved from a pile, turn the next one up
    if (!this.collection.isEmpty())
      this.collection.last().set('visible', true);
  },


  isDroppable: function (rank, suit) {
    if (this.collection.isEmpty()) {
      // only allow the highest rank, i.e. the king
      return rank === Card.RANKS[Card.RANKS.length-1];
    }

    var topCard = this.collection.last();
    return topCard.isHigherRank(rank) && topCard.isAlternateSuit(suit);
  }

});
