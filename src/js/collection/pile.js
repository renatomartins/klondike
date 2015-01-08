var Pile = Cards.extend({

  initialize: function (models) {
    var topCard = _.last(models);
    if (topCard) {
      topCard.set({
        visible: true,
        draggable: true
      }, {
        silent: true
      });
    }

    this.on('add', this.onAdd);
    this.on('remove', this.onRemove);
  },


  onAdd: function (model) {
    model.set({
      visible: true,
      draggable: true
    });
  },


  onRemove: function (model) {
    if (this.isEmpty())
      return;

    this.last().set({
      visible: true,
      draggable: true
    });
  },


  isDroppable: function (rank, suit) {
    if (this.isEmpty())
      return rank === _.last(Card.RANKS);

    var topCard = this.last();
    return topCard.isHigherRank(rank) && topCard.isAlternateSuit(suit);
  }
  
});
