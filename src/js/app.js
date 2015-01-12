this.settings = new Settings();
new SettingsView({
  el: '#settings',
  model: this.settings
});

var doubleDeck = this.settings.get('doubleDeck');
var cards = Card.getShuffledDeck();
var pileCount = doubleDeck ? 9 : 7;
var foundationCount = doubleDeck ? 8 : 4;
var $piles = $('.piles');
var $foundations = $('.foundations');

if (doubleDeck)
  $('#game').addClass('double-deck');

var view;
_.times(pileCount, function (n) {
  view = new CardsView({
    collection: new Pile(cards.splice(0, n+1))
  });
  $piles.append(view.render().$el);
});

this.waste = new Waste();
new WasteView({
  el: '#game .waste',
  collection: this.waste
}).render();

this.deck = new Deck(cards);
new DeckView({
  el: '#game .deck',
  collection: this.deck
}).render();

this.foundations = [];
var foundation;
_.times(foundationCount, function (n) {
  foundation = new Foundation();
  this.foundations.push(foundation);
  view = new CardsView({
    collection: foundation
  });
  $foundations.append(view.render().$el);
});
