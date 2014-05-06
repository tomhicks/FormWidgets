define(function(require) {

    'use strict';

    var _ = require('underscore');
    var Marionette = require('marionette');
    var template = require('text!./button.html');
    var Backbone = require('backbone');
    var Cocktail = require('cocktail');

    require('backbone.stickit');

    var mixins = [
        require('./behaviors/create-view-model'),
        require('./behaviors/bind-entity-and-view-model')
    ];

    var ButtonWidget = Marionette.ItemView.extend({
        
        template: _.template(template),

        attributes: {
            'data-widget-type': 'button',
            'class': 'form-group'
        },

        storedOptions: [
            'entity',
            'model',
            'bindingBasePath'
        ],

        bindings: {
            '> .widget-caption': 'caption'
        },

        initialize: function (options) {
            _.extend(this, _.pick(options, this.storedOptions));

            // construct the view model
            var modelBindings = this.model.get('bindings');
            var boundKeys = _.keys(modelBindings);
            var boundData = _.reduce(boundKeys, function (memo, key) {
                memo[key] = this.entity.get(modelBindings[key]);
                return memo;
            }.bind(this), {});

            this.viewModel = new Backbone.Model(_.extend({}, this.model.toJSON(), boundData));

            // update the view model when the entity is changed
            _.each(modelBindings, function (value, key) {
                this.listenTo(this.entity, 'change:' + value, function (model, value) {
                    this.viewModel.set(key, value);
                });
            }.bind(this));

            // update the entity when the view model changes
            this.listenTo(this.viewModel, 'change:value', function (model, value) {
                this.entity.set(modelBindings.value, value);
            });
        },

        onRender: function () {
            this.stickit(this.viewModel);
        },

        serializeData: function () {
            return this.viewModel.toJSON();
        }
    });

    Cocktail.mixin(ButtonWidget, mixins);

    return ButtonWidget;

});
