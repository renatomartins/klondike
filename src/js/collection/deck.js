var Deck = Cards.extend({

  passes: 0,


  takeCards: function () {
    if (this.isEmpty()) {
      ++this.passes;
      var passesLimit = settings.get('passesLimit');
      if (passesLimit === 'infinite' || this.passes < passesLimit)
        this.refill();
    } else {
      this.moveToWaste();
    }
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
    var models = this.last(settings.get('moveCount')).reverse();
    waste.add(this.remove(models));
  }

});
