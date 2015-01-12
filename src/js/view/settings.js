var SettingsView = Backbone.View.extend({

  events: {
    'change input#deal':    'onChangeDeal',
    'change select#passes': 'onChangePasses',
    'change input#decks':   'onChangeDecks',
    'click .reload':        'reload'
  },


  initialize: function () {
    this.$deal = this.$('input#deal');
    this.$passes = this.$('select#passes');
    this.$decks = this.$('input#decks');
    this.render();
  },


  render: function () {
    this.$deal.prop('checked', this.model.get('moveCount') > 1);
    this.$passes.val(this.model.get('passesLimit'));
    this.$decks.prop('checked', this.model.get('doubleDeck'));
    return this;
  },


  onChangeDeal: function () {
    this.model.set('moveCount', this.$deal.is(':checked') ? 3 : 1);
  },


  onChangePasses: function () {
    this.model.set('passesLimit', this.$passes.val());
  },


  onChangeDecks: function () {
    this.model.set('doubleDeck', this.$decks.is(':checked'));
  },


  reload: function () {
    window.location.reload(false);
  }

});
