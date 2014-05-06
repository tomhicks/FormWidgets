define(function (require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');

    return {
        initialize: function () {
            // construct the view model
            var modelBindings = this.model.get('bindings');
            var boundKeys = _.keys(modelBindings);
            var boundData = _.reduce(boundKeys, function (memo, key) {
                memo[key] = this.entity.get(this.bindingBasePath + (this.bindingBasePath ? '.' : '') + modelBindings[key]);
                return memo;
            }.bind(this), {});

            this.viewModel = new Backbone.Model(_.extend({}, this.model.toJSON(), boundData));
        }
    };
});
