var Cards = Backbone.Collection.extend({

  model: Card,


  // Checks if a rank and suit can be dropped on the top card of
  // this collection.
  isDroppable: function (rank, suit) {
    return false;
  }

});
