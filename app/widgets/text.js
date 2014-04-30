define(function(require) {

    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var template = require('text!./text.html');

    return Marionette.ItemView.extend({
        
        template: _.template(template),

        attributes: {
            'data-widget-type': 'text',
            'class': 'form-group'
        },

        storedOptions: [
            'entity',
            'model'
        ],

        initialize: function (options) {
            _.extend(this, _.pick(options, this.storedOptions));

            var bindings = this.model.get('bindings');
            var boundKeys = _.keys(bindings);
            var boundData = _.reduce(boundKeys, function (memo, key) {
                memo[key] = this.entity.get(bindings[key]);
                return memo;
            }.bind(this), {});

            this.viewModel = new Backbone.Model(_.extend({}, this.model.toJSON(), boundData));
        },

        serializeData: function () {
            return this.viewModel.toJSON();
        }

    });

});
