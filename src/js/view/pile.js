var PileView = CardsView.extend({

  render: function () {
    this.collection.last().set('visible', true);
    CardsView.prototype.render.apply(this);
    return this;
  },


  removeView: function () {
    CardsView.prototype.removeView.apply(this, arguments);
    // when a card is moved from a pile, turn the next one up
    if (!this.collection.isEmpty())
      this.collection.last().set('visible', true);
  },


  // TODO: simplify this method
  verifyDroppable: function (rank, suit, enterOrLeave) {
    var topCard = this.collection.last();
    var result = topCard.isHigherRank(rank) && topCard.isAlternateSuit(suit);
    if (enterOrLeave !== undefined && result)
      topCard.switchDroppable(enterOrLeave);
    return result;
  }

});
