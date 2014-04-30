define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');

    var Node = Backbone.Model.extend({
        parse: function(data) {
            if (_.isArray(data.children)) {
                data.children = new Backbone.Collection(_.map(data.children, function (child) {
                    return new Node(child, {
                        parse: true
                    });
                }));
            }

            return data;
        }
    });

    return Node;
});
