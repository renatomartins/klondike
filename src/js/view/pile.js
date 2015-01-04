var PileView = CardsView.extend({

  render: function () {
    this.collection.last().set('visible', true);
    CardsView.prototype.render.apply(this);
    return this;
  }

});
