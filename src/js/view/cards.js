var CardsView = Backbone.View.extend({

  initialize: function () {
    this.views = [];
    this.render();
  },


  render: function () {
    var _this = this;
    this.collection.each(function (card) {
      var view = new CardView({model: card});
      _this.$el.append(view.$el);
      _this.views.push(view);
    });
    return this;
  }

});
