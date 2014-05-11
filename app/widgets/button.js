define(function(require) {

    'use strict';

    var _ = require('underscore');
    var Marionette = require('marionette');
    var template = require('text!./button.html');
    var Cocktail = require('cocktail');
    var Backbone = require('backbone');

    require('backbone.stickit');

    var mixins = [
        require('./behaviors/create-view-model')
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

        events: {
            'click button': 'onClick'
        },

        bindings: {
            '> .widget-caption': 'caption'
        },

        initialize: function (options) {
            _.extend(this, _.pick(options, this.storedOptions));
        },

        onRender: function () {
            this.stickit(this.viewModel);
        },

        serializeData: function () {
            return this.viewModel.toJSON();
        },

        onClick: function () {
            if (this.model.get('url')) {
                Backbone.history.navigate(this.model.get('url'), true);
            }
        }
    });

    Cocktail.mixin(ButtonWidget, mixins);

    return ButtonWidget;

});
