var Settings = Backbone.Model.extend({

  localStorage: new Backbone.LocalStorage('settings'),


  defaults: {
    moveCount: 1,
    passesLimit: 'infinite',
    doubleDeck: false
  },


  initialize: function () {
    if (this.localStorage.findAll().length)
      this.fetch();
    else
      this.save();
    this.on('change', this.onChange);
  },


  parse: function (data) {
    if (_.isArray(data))
      data = data[0];
    return data;
  },


  onChange: function () {
    this.save();
  }

});
