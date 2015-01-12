var WasteView = CardsView.extend({

  initialize: function () {
    CardsView.prototype.initialize.apply(this, arguments);
    this.$el.attr('data-count', settings.get('moveCount'));
  }

});
