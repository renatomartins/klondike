var CardsView = Backbone.View.extend({

  initialize: function () {
    this.views = {};
    this.render();

    this.listenTo(this.collection, 'add', this.addView);
    this.listenTo(this.collection, 'remove', this.removeView);
    this.listenTo(this.collection, 'reset', this.render);
  },


  render: function () {
    this.removeViews();
    this.collection.each(this.appendView, this);
    return this;
  },


  appendView: function (model) {
    var view = new CardView({model: model});
    this.$el.append(view.$el);
    this.views[model.cid] = view;
  },


  addView: function (model) {
    model.set('visible', true);
    this.appendView(model);
  },


  removeView: function (model) {
    this.views[model.cid].remove();
  },


  removeViews: function () {
    _.each(this.views, function (view) {
      view.remove();
    });
  },


  reset: function () {
    this.collection.setVisible(false);
    this.render();
  }

});
