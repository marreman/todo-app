app(function () {
    "use strict";

    var tpl = app.tpl('item'),
        list = app.el.find('.list');

    function Item(data, meta) {
        var _this = this;

        this.data = data;
        this.meta = meta;
        this.el = $($.render(tpl, this.data));

        this.el.find('.item-remove').on('click', function (event) {
            event.preventDefault();
            meta.trigger('remove');
        });

        this.el.find('.item-checkbox').prop('checked', this.data.done).on('change', function () {
            _this.data.done = this.checked;
            _this.el[(_this.data.done ? 'addClass' : 'removeClass')]('item-done');
            meta.trigger('change');
        });

        this.meta.on('removed', function () {
            _this.el.remove();
        });
    }

    app.on('item:added', function (data, meta) {
        var item = new Item(data, meta);
        list.append(item.el);
    });
});

app(function () {
    'use strict';

    var uuid = window.location.hash = window.location.hash.slice(1) || uuid(),
        fb = new Firebase('https://to-buy.firebaseio.com/').child(uuid),
        items = {};

    // function Model(snap) {
    //     this.data =
    // }

    function uuid() {
        return ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).substr(-4);
    }

    fb.on('child_added', function (snap) {
        var item = snap.val(),
            meta = $.observable({ id: snap.name() });

        meta.on('change', function () {
            fb.child(meta.id).set(item);
        });

        meta.on('remove', function () {
            fb.child(meta.id).remove();
        });

        items[meta.id] = {
            data: item,
            meta: meta
        };

        app.trigger('item:added', item, meta);
    });

    fb.on('child_removed', function(snap) {
        var item = items[snap.name()];
        item.meta.trigger('removed');
    });

    app.on('item:new', function (itemName) {
        fb.push({
            name: itemName,
            done: false
        });
    });
});


app(function () {
    "use strict";

    var input = app.el.find('input.new-item');

    input.on('keypress', function (event) {
        if (event.which === 13 && input.val()) {
            app.trigger('item:new', input.val());
            input.val('');
        }
    });
});