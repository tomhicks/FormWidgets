define(function(require) {

    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var template = require('text!./repeater.html');

    var RepeaterItem = Marionette.CollectionView.extend({

        tagName: 'div',
        className: 'repeater-item',

        itemView: Backbone.View,

        initialize: function (options) {
            this.entity = options.entity;
        },

        buildItemView: function(formNode) {
            var WidgetType = widgetMap[formNode.get('type')];
            var options;

            if (!WidgetType) {
                throw new Error('Widget type "' + formNode.get('type') + '" does not exist');
            }

            options = {
                model: formNode,
                entity: this.entity
            };

            return new WidgetType(options);
        }
    });

    var Repeater = Marionette.CompositeView.extend({
        
        events: {
            'click button': 'addItem'
        },

        template: _.template(template),

        itemViewContainer: '.repeater-contents',

        attributes: {
            'data-widget-type': 'repeater',
            class: 'well'
        },

        storedOptions: [
            'entity',
            'model'
        ],

        initialize: function (options) {
            _.extend(this, _.pick(options, this.storedOptions));
            this.collection = new Backbone.Collection(this.entity.get(this.model.get('bindings').value));
        },

        buildItemView: function(item) {
            return new RepeaterItem({
                collection: this.model.get('children'),
                entity: item
            });
        },

        addItem: function (event) {
            event.preventDefault();
            event.stopPropagation();

            this.collection.add({});
        }
    });

    var widgetMap = {
        button: require('./button'),
        date: require('./date'),
        text: require('./text'),
        repeater: Repeater
    };

    return Repeater;

});
