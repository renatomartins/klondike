var CardView = Backbone.View.extend({

  // classNames for card pips
  pipsClasses: (function () {
    var c = {};
    c[Card.ACE] = [
      'h2 v5 figure'
    ];
    c[Card.TWO] = [
      'h2 v1',
      'h2 v9'
    ];
    c[Card.THREE] = [
      'h2 v1',
      'h2 v5',
      'h2 v9'
    ];
    c[Card.FOUR] = [
      'h1 v1',
      'h3 v1',
      'h1 v9',
      'h3 v9'
    ];
    c[Card.FIVE] = [
      'h1 v1',
      'h3 v1',
      'h2 v5',
      'h1 v9',
      'h3 v9'
    ];
    c[Card.SIX] = [
      'h1 v1',
      'h3 v1',
      'h1 v5',
      'h3 v5',
      'h1 v9',
      'h3 v9'
    ];
    c[Card.SEVEN] = [
      'h1 v1',
      'h3 v1',
      'h2 v3',
      'h1 v5',
      'h3 v5',
      'h1 v9',
      'h3 v9'
    ];
    c[Card.EIGHT] = [
      'h1 v1',
      'h3 v1',
      'h2 v3',
      'h1 v5',
      'h3 v5',
      'h2 v7',
      'h1 v9',
      'h3 v9'
    ];
    c[Card.NINE] = [
      'h1 v1',
      'h3 v1',
      'h1 v4',
      'h3 v4',
      'h2 v5',
      'h1 v6',
      'h3 v6',
      'h1 v9',
      'h3 v9'
    ];
    c[Card.TEN] = [
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
    ];
    c[Card.JACK] = [
      'h3 v1',
      'h1 v9',
      'h2 v5 figure'
    ];
    c[Card.QUEEN] = [
      'h3 v1',
      'h1 v9',
      'h2 v5 figure'
    ];
    c[Card.KING] = [
      'h3 v1',
      'h1 v9',
      'h2 v5 figure'
    ];
    return c;
  })(),


  template: Templates.Card,


  events: {
    'click': 'turn'
  },


  className: function () {
    var cn = 'card ';
    if (this.isVisible())
      cn += 'rank-' + this.model.get('rank') + ' suit-' + this.model.get('suit');
    else
      cn += 'back';
    return cn;
  },


  isVisible: function () {
    return this.model && this.model.isVisible();
  },


  renderPips: function (rank) {
    var inject = function (html, className) {
      return html + '<div class="' + className + '"></div>';
    };
    return _.inject(this.pipsClasses[rank], inject, '');
  },


  render: function () {
    // refresh classes, in case the card is being turned
    this.$el.removeClass().addClass(this.className());

    if (!this.isVisible())
      return this;

    var rank = this.model.get('rank');
    this.$el.html(this.template({
      rank: rank,
      pips: this.renderPips(rank)
    }));

    return this;
  },


  turn: function () {
    this.model.toggleVisible();
    this.render();
  }

});
