var CardsView = Backbone.View.extend({

  events: {
    'dragenter': 'onDragEnter',
    'dragleave': 'onDragLeave',
    'dragover': 'onDragOver',
    'drop': 'onDrop'
  },


  // Checks if this rank and suit can be dropped on the top card of this
  // collection. Pass `enterOrLeave` (true or false) to add or remove the
  // droppable class on the top card. Returns boolean.
  // Override
  verifyDroppable: function (rank, suit, enterOrLeave) {},


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
  },


  onDragEnter: function (e) {
    var data = this.getDragDropData(event);
    this.verifyDroppable(data.rank, data.suit, true);
  },


  onDragLeave: function (e) {
    var data = this.getDragDropData(event);
    this.verifyDroppable(data.rank, data.suit, false);
  },


  onDragOver: function (e) {
    var data = this.getDragDropData(event);
    if (this.verifyDroppable(data.rank, data.suit)) {
      // this marks the drop as acceptable!
      e.preventDefault();
    }
  },


  onDrop: function (e) {
    var data = this.getDragDropData(event);
    this.collection.last().switchDroppable(false);
    this.collection.add(new Card(data));
    e.preventDefault();
  },


  getDragDropData: function (e) {
    var data = e.dataTransfer.getData('text/plain');
    return Card.parseDragDropData(data);
  }

});
