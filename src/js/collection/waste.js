var Waste = Cards.extend({

  initialize: function (models, options) {
    this.moveCount = options.moveCount;

    this.on('add', this.onAdd);
    this.on('remove', this.onRemove);
  },


  onAdd: function (model) {
    var attrs = {visible: true};

    if (model.isTopCard()) {
      attrs.draggable = true;
      // make previous top card not draggable
      var previous = this.slice(-this.moveCount - 1, -this.moveCount);
      if (previous.length)
        previous[0].set({draggable: false});
    }
    model.set(attrs);
  },


  onRemove: function (model) {
    if (this.isEmpty())
      return;

    this.last().set('draggable', true);
  }

});
