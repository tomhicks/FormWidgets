define(function(require) {

    'use strict';

    var _ = require('underscore');
    var Marionette = require('marionette');
    var template = require('text!./text.html');
    var Cocktail = require('cocktail');

    require('backbone.stickit');

    var mixins = [
        require('./behaviors/create-view-model')
    ];

    var TextWidget = Marionette.ItemView.extend({

        template: _.template(template),

        attributes: {
            'data-widget-type': 'text',
            'class': 'form-group'
        },

        storedOptions: [
            'entity',
            'model',
            'bindingBasePath'
        ],

        bindings: {
                input: 'value',
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
        }
    });

    Cocktail.mixin(TextWidget, mixins);
    return TextWidget;

});
