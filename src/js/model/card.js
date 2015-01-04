var Card = Backbone.Model.extend({

  defaults: {
    visible: false
  },


  isVisible: function () {
    return this.get('visible');
  },


  toggleVisible: function () {
    this.set('visible', !this.get('visible'));
  }

}, {
  ACE: 'A',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
  NINE: '9',
  TEN: '10',
  JACK: 'J',
  QUEEN: 'Q',
  KING: 'K',
  HEARTS: 'hearts',
  CLUBS: 'clubs',
  SPADES: 'spades',
  DIAMONDS: 'diamonds'
});
