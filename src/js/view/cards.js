var CardsView = Backbone.View.extend({

  events: {
    'dragenter': 'onDragEnter',
    'dragleave': 'onDragLeave',
    'dragover': 'onDragOver',
    'drop': 'onDrop'
  },


  initialize: function () {
    this.views = {};

    this.listenTo(this.collection, 'add', this.addCard);
    this.listenTo(this.collection, 'remove', this.removeCard);
    this.listenTo(this.collection, 'reset', this.render);
  },


  render: function () {
    this.removeCards();
    this.collection.each(this.appendView, this);
    return this;
  },


  appendView: function (model) {
    var view = new CardView({model: model});
    this.$el.append(view.$el);
    this.views[model.cid] = view;
  },


  addCard: function (model) {
    this.appendView(model);
  },


  removeCard: function (model) {
    this.views[model.cid].remove();
  },


  removeCards: function () {
    _.each(this.views, function (view) {
      view.remove();
    });
  },


  onDragEnter: function (e) {
    var data = this.getDragDropData(e);
    if (this.collection.isDroppable(data[0].rank, data[0].suit)) {
      this.$el.addClass('droppable');
    }
  },


  onDragLeave: function (e) {
    var data = this.getDragDropData(e);
    if (this.collection.isDroppable(data[0].rank, data[0].suit)) {
      this.$el.removeClass('droppable');
    }
  },


  onDragOver: function (e) {
    var data = this.getDragDropData(e);
    if (this.collection.isDroppable(data[0].rank, data[0].suit)) {
      // this marks the drop as acceptable!
      e.preventDefault();
    }
  },


  onDrop: function (e) {
    var data = this.getDragDropData(e);
    // removes the droppable helper class
    this.$el.removeClass('droppable');
    // adds the models to this collection
    this.collection.add(data);
    e.preventDefault();
  },


  getDragDropData: function (e) {
    event = e.originalEvent;
    var json = event.dataTransfer.getData('text/json');
    return JSON.parse(json);
  }

});
