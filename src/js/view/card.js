var CardView = Backbone.View.extend({

  // classNames for card pips
  pipsClasses: [
    [
      'h2 v5 figure'
    ], [
      'h2 v1',
      'h2 v9'
    ], [
      'h2 v1',
      'h2 v5',
      'h2 v9'
    ], [
      'h1 v1',
      'h3 v1',
      'h1 v9',
      'h3 v9'
    ], [
      'h1 v1',
      'h3 v1',
      'h2 v5',
      'h1 v9',
      'h3 v9'
    ], [
      'h1 v1',
      'h3 v1',
      'h1 v5',
      'h3 v5',
      'h1 v9',
      'h3 v9'
    ], [
      'h1 v1',
      'h3 v1',
      'h2 v3',
      'h1 v5',
      'h3 v5',
      'h1 v9',
      'h3 v9'
    ], [
      'h1 v1',
      'h3 v1',
      'h2 v3',
      'h1 v5',
      'h3 v5',
      'h2 v7',
      'h1 v9',
      'h3 v9'
    ], [
      'h1 v1',
      'h3 v1',
      'h1 v4',
      'h3 v4',
      'h2 v5',
      'h1 v6',
      'h3 v6',
      'h1 v9',
      'h3 v9'
    ], [
      'h1 v1',
      'h3 v1',
      'h2 v2',
      'h1 v4',
      'h3 v4',
      'h1 v6',
      'h3 v6',
      'h2 v8',
      'h1 v9',
      'h3 v9'
    ], [
      'h3 v1',
      'h1 v9',
      'h2 v5 figure'
    ], [
      'h3 v1',
      'h1 v9',
      'h2 v5 figure'
    ], [
      'h3 v1',
      'h1 v9',
      'h2 v5 figure'
    ]
  ],


  template: Templates.Card,


  events: {
    'dblclick': 'tryFoundation',
    'dragstart': 'onDragStart',
    'dragend': 'onDragEnd'
  },


  attributes: function () {
    var attrs = {};
    if (this.isVisible()) {
      var rank = this.model.get('rank');
      var suit = this.model.get('suit');
      attrs.draggable = true;
      attrs['class'] = 'card rank-' + rank + ' suit-' + suit;
    } else {
      attrs['class'] = 'card back';
    }
    return attrs;
  },


  initialize: function (options) {
    this.render();

    this.listenTo(this.model, 'change:visible', this.render);
    this.listenTo(this.model, 'switch-droppable', this.switchDroppable);
  },


  isVisible: function () {
    return this.model.get('visible');
  },


  renderPips: function (rank) {
    var inject = function (html, className) {
      return html + '<div class="' + className + '"></div>';
    };
    var rankIndex = this.model.getRankIndex();
    return _.inject(this.pipsClasses[rankIndex], inject, '');
  },


  render: function () {
    this.$el.empty();
    // refresh attributes, in case the card is being turned
    this.$el.attr(this.attributes());

    if (!this.isVisible())
      return this;

    var rank = this.model.get('rank');
    this.$el.append(this.template({
      rank: rank,
      pips: this.renderPips(rank)
    }));

    return this;
  },


  switchDroppable: function (value) {
    if (value)
      this.$el.addClass('droppable');
    else
      this.$el.removeClass('droppable');
  },


  tryFoundation: function () {
    var rank = this.model.get('rank');
    var suit = this.model.get('suit');
    _.each(foundations, function (foundation) {
      if (foundation.verifyDroppable(rank, suit)) {
        foundation.collection.add(this.model.collection.remove(this.model));
        return;
      }
    }, this);
  },


  onDragStart: function (e) {
    var event = e.originalEvent;
    // get all models starting from the one grabbed
    var modelIndex = this.model.collection.lastIndexOf(this.model);
    var models = this.model.collection.slice(modelIndex);
    var data = _.map(models, function (model) {
      return model.pick('rank', 'suit');
    });

    event.dataTransfer.setData('text/json', JSON.stringify(data));
    event.dataTransfer.dropEffect = 'move';
  },


  onDragEnd: function (e) {
    var event = e.originalEvent;
    if (event.dataTransfer.dropEffect === 'move') {
      var modelIndex = this.model.collection.lastIndexOf(this.model);
      var models = this.model.collection.slice(modelIndex);
      this.model.collection.remove(models);
    }
  }

});
