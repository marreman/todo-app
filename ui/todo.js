app(function () {
    "use strict";

    var tpl = app.tpl('item'),
        list = app.el.find('.list');

    function renderItem(item) {
        var node = $($.render(tpl, { name: item }));

        node.find('.item-remove').on('click', function (event) {
            event.preventDefault();
            //node.remove();
            app.trigger('item:remove', item);
        });

        node.find('.item-checkbox').on('change', function () {
            node[(this.checked ? 'addClass' : 'removeClass')]('item-done');
        });

        list.append(node);
    }

    app.on('items', function (items) {
        list.empty();
        if (items) {
            items.forEach(renderItem);
        }
    })
});

app(function () {
    "use strict";

    var loc = window.location;

    function clean(items) {
        return items.map(function (item) {
            return $.trim(item);
        }).filter(function (item) {
            return !!item;
        });
    }

    function hash(val) {
        if (val) {
            loc.hash = clean(val).join(',');
        } else {
            return clean(loc.hash.slice(1).split(','));
        }
    }

    $.route(function () {
        app.trigger('items', hash());
    });

    app.on('item:new', function (item) {
        var items = hash();
        items.push($.trim(item));
        hash(items);
    });

    app.on('item:remove', function (item) {
        var items = hash(),
            index = items.indexOf(item);

        items.splice(index, 1);
        hash(items);
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