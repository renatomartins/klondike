var DeckView = CardsView.extend({

  events: {
    'click': 'takeOne'
  },


  takeOne: function () {
    if (this.collection.isEmpty()) {
      waste.refillDeck();
    } else {
      waste.collection.add(this.collection.pop());
    }
  },


  verifyDroppable: function () {
    return false;
  }

});
