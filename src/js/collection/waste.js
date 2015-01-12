var Waste = Cards.extend({

  initialize: function () {
    this.on('add', this.onAdd);
    this.on('remove', this.onRemove);
  },


  onAdd: function (model) {
    var attrs = {visible: true};

    if (model.isTopCard()) {
      attrs.draggable = true;
      var moveCount = settings.get('moveCount');
      // make previous top card not draggable
      var previous = this.slice(-moveCount - 1, -moveCount);
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
