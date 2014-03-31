define(function () {
  'use strict';

  function ItemModel(snap) {
    this.id = snap.name();
    this.data = snap.val();
    this.ref = snap.ref();

    $.observable(this);
  }

  ItemModel.prototype.save = function () {
    this.ref.set(this.data);
  };

  ItemModel.prototype.update = function (newData) {
    $.extend(this.data, newData);
    this.trigger('changed');
    return this;
  };

  ItemModel.prototype.remove = function () {
    this.ref.remove();
    this.trigger('removed');
  };

  return ItemModel;
});
