define(function (require) {
    'use strict';

    var _ = require('underscore');
    var template = require('text!./form.html');
    var Marionette = require('marionette');
    var Cocktail = require('cocktail');

    require('backbone.stickit');

    var mixins = [
        require('./behaviors/create-view-model')
    ];

    var FormWidget = Marionette.CompositeView.extend(_.extend({
        tagName: 'form',

        template: _.template(template),
        attributes: {
            'data-widget-type': 'form'
        },

        itemViewContainer: '.form-contents',

        storedOptions: [
            'entity',
            'model',
            'bindingBasePath'
        ],

        bindings: {
            '> .widget-caption': 'caption'
        },

        widgetMap: {
            button: require('./button'),
            date: require('./date'),
            repeater: require('./repeater'),
            text: require('./text')
        },

        bindingBasePath: '',

        initialize: function (options) {
            _.extend(this, _.pick(options, this.storedOptions));
            this.collection = this.model.get('children');

            // add this constructor to the widgetMap
            this.widgetMap.form = FormWidget;
        },

        setBindingBasePath: function (bindingBasePath) {
            this.bindingBasePath = bindingBasePath;

            this.children.each(function (child) {
                child.setBindingBasePath(this.bindingBasePath);
            }, this);

            return this;
        },

    }, require('./behaviors/build-bound-item-view')));

    Cocktail.mixin(FormWidget, mixins);
    return FormWidget;

});
