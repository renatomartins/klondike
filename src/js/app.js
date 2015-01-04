(function () {

  var ranks = [
    'ACE',
    'TWO',
    'THREE',
    'FOUR',
    'FIVE',
    'SIX',
    'SEVEN',
    'EIGHT',
    'NINE',
    'TEN',
    'JACK',
    'QUEEN',
    'KING'
  ];
  var suits = [
    'HEARTS',
    'CLUBS',
    'DIAMONDS',
    'SPADES'
  ];

  var $body = $('body');

  _.each(suits, function (suit) {
    _.each(ranks, function (rank) {
      var model = new Card({
        rank: Card[rank],
        suit: Card[suit]
      });
      var view = new CardView({model: model});
      $body.append(view.render().$el);
    });
    $body.append('<br><br>');
  });

  var modelBack = new Card({
    rank: Card.ACE,
    suit: Card.HEARTS,
    visible: false
  });
  var backCard = new CardView({model: modelBack});
  $body.append(backCard.render().$el);

}());
