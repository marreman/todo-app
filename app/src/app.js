define(['item-list', 'item-view'], function (ItemList, ItemView) {
  'use strict';

  function genUUID() {
    return ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).substr(-4);
  }

  var fbRef = (function () {
      var url = 'https://to-buy.firebaseio.com/',
          uuid = window.location.hash = window.location.hash.slice(1) || genUUID();
      return new Firebase(url).child(uuid);
    }()),

    list = $('.list'),
    input = $('input.new-item'),

    itemList = new ItemList(fbRef);

  itemList.on('item:added', function (model) {
    var item = new ItemView(model);
    list.prepend(item.render().el);
  });

  input.on('keypress', function (event) {
    if (event.which === 13 && input.val()) {
      itemList.newItem(input.val());
      input.val('');
    }
  }).on('focus', function () {
    input.css('position', 'static');
  });
});
