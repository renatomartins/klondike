var PileView = CardsView.extend({

  render: function () {
    CardsView.prototype.render.apply(this);
    this.views[this.views.length-1].turn();
    return this;
  }

});
