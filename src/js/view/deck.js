var DeckView = CardsView.extend({

  events: {
    'click': 'takeCards'
  },


  takeCards: function () {
    this.collection.takeCards();
  }

});
