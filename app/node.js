define(function(require) {
    'use strict';

    var NestedModel = require('nested-model');
    var Backbone = require('backbone');

    var Node = NestedModel.extend({
        parse: function(data) {
            data.children = new Children(data.children, { parse: true });
            return data;
        },

        toJSON: function () {
            var json = NestedModel.prototype.toJSON.apply(this, arguments);

            json.children = json.children.toJSON();

            return json;
        }
    });

    var Children = Backbone.Collection.extend({
        model: Node
    });

    return Node;
});
