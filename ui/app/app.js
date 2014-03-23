window.app = (function () {
  'use strict';

  var registry = {};

  function app(first, second) {
    if ($.type(first) === 'function') {
      first(app);
    } else if ($.type(first) === 'string' && $.type(second) === 'function') {
      registry[first] = second(app);
    }
  }

  app.el = $('#app');

  app.tpl = function (name) {
    var tpl = $('.tpl-' + name);
    return tpl.html();
  };

  app.get = function (name) {
    return registry[name];
  };

  return $.observable(app);

}());
