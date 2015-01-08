var Deck = Cards.extend({

  initialize: function (models, options) {
    this.moveCount = options.moveCount;
  },


  takeCards: function () {
    if (this.isEmpty())
      this.refill();
    else
      this.moveToWaste();
  },


  refill: function () {
    var models = waste.each(function (model) {
      model.set({
        visible: false,
        draggable: false
      });
    });
    this.reset(models.reverse());
    waste.reset();
  },


  moveToWaste: function () {
    var models = this.last(this.moveCount).reverse();
    waste.add(this.remove(models));
  }

});
