var FoundationView = CardsView.extend({

  verifyDroppable: function (rank, suit, enterOrLeave) {
    if (this.collection.isEmpty()) {
      // only allow the lowest rank, i.e. the ace
      return rank === Card.RANKS[0];
    }

    var topCard = this.collection.last();
    var result = topCard.isLowerRank(rank) && topCard.isSameSuit(suit);
    if (enterOrLeave !== undefined && result)
      topCard.switchDroppable(enterOrLeave);
    return result;
  }

});
