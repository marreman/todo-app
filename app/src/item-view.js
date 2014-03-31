define(['text!item.tpl.html'], function (itemTpl) {

  'use strict';

  function ItemView(model) {
    var _this = this;

    this.model = model;

    this.model.on('changed', function () {
        _this.render();
    });

    this.model.on('removed', function () {
        _this.remove();
    });
  }

  ItemView.prototype.tpl = itemTpl;

  ItemView.prototype.bindHandlers = function () {
    var _this = this,
      h = null,
      removeMark = this.el.find('.item-remove-mark');

    this.el[_this.model.data.done ? 'addClass' : 'removeClass']('item-done');

    this.el.on('tap', function () {
      _this.model.data.done = !_this.model.data.done;
      _this.model.save();
    });

    function prevent(event) {
      event.preventDefault();
    }

    h = new Hammer(this.el.get(0));

    h.on('dragstart', function () {
      $(document).on('touchmove', prevent);
    });

    h.on('drag', function(event) {
      var opacity = (1 - (event.gesture.deltaX / -100));

      if (event.gesture.deltaX > 0) {
        return;
      }

      if (event.gesture.deltaX < -70) {
        removeMark.show();
      } else {
        removeMark.hide();
      }

      event.stopImmediatePropagation();

      _this.el.css({
        'background-color': 'rgba(255, 255, 255,' + opacity + ')',
        'border-bottom-color': 'rgba(232, 234, 236,' + opacity + ')',
        '-webkit-transform': 'translateX(' + event.gesture.deltaX + 'px)'
      });
    });

    h.on('dragend', function(event) {
      if (event.gesture.deltaX < -70) {
        _this.model.remove();
      } else {
        _this.el.css({
          'background-color': '#fff',
          'border-color-bottom': '',
          'transition': 'all 0.2s ease-in-out',
          '-webkit-transform': 'translateX(0px)'
        });

        setTimeout(function () {
          _this.el.css('transition', '');
        }, 300);
      }

      $(document).off('touchmove', prevent);
    });
  };

  ItemView.prototype.render = function () {
    var newEl = $($.render(this.tpl, this.model.data));

    if (this.el) {
      this.el.replaceWith(newEl);
    }

    this.el = newEl;
    this.bindHandlers();

    return this;
  };

  ItemView.prototype.remove = function () {
    this.el.remove();
  };

  return ItemView;
});
