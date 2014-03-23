app('item-list', function () {
    'use strict';

    var ItemModel = app.get('item-model');

    function ItemList(fbRef) {
        var _this = this;

        this.fbRef = fbRef;
        this.items = {};

        $.observable(this);

        this.fbRef.on('child_added', function (snap) {
            var model = new ItemModel(snap);
            _this.items[model.id] = model;
            _this.trigger('item:added', model);
        });

        this.fbRef.on('child_changed', function (snap) {
            var model = _this.items[snap.name()];
            if (model) model.update(snap.val());
        });

        this.fbRef.on('child_removed', function(snap) {
            var model = _this.items[snap.name()];
            if (model) model.remove();
        });
    }

    ItemList.prototype.newItem = function (itemName) {
        this.fbRef.push({
            name: itemName,
            done: false
        });
    };

    return ItemList;
});