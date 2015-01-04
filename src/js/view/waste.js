var WasteView = CardsView.extend({

  refillDeck: function () {
    var models = this.collection.each(function (model) {
      model.set('visible', false);
    }).reverse();

    deck.collection.reset(models);
    this.collection.reset();
  }

});
