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
            this.bindingBasePath = options.bindingBasePath;
            this.widgetMap = options.widgetMap;
        },

        buildItemView: function(formNode) {
            var WidgetType = this.widgetMap[formNode.get('type')];
            var options;

            if (!WidgetType) {
                throw new Error('Widget type "' + formNode.get('type') + '" does not exist');
            }

            options = {
                model: formNode,
                entity: this.entity,
                bindingBasePath: this.bindingBasePath
            };

            if (WidgetType === this.widgetMap.repeater) {
                options.widgetMap = this.widgetMap;
            }

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
            'model',
            'bindingBasePath',
            'widgetMap'
        ],

        initialize: function (options) {
            _.extend(this, _.pick(options, this.storedOptions));
            this.collection = new Backbone.Collection(this.entity.get(this.bindingBasePath + (this.bindingBasePath ? '.' : '') + this.model.get('bindings').value));

            if (!this.entity.get(this.bindingBasePath + (this.bindingBasePath ? '.' : '') + this.model.get('bindings').value)) {
                this.entity.set(this.bindingBasePath + (this.bindingBasePath ? '.' : '') + this.model.get('bindings').value, []);
            }

            this.listenTo(this.collection, 'add', function () {
                this.entity.add(this.bindingBasePath + (this.bindingBasePath ? '.' : '') + this.model.get('bindings').value, {});
            }, this);
        },

        buildItemView: function(item) {
            this.stopListening(item);
            this.listenTo(item, 'change', function (model) {
                var index = this.collection.indexOf(model);
                _.extend(this.entity.get(this.model.get('bindings').value)[index], model.changed);
            }, this);

            return new RepeaterItem({
                collection: this.model.get('children'),
                entity: this.entity,
                bindingBasePath: this.bindingBasePath + (this.bindingBasePath ? '.' : '') + this.model.get('bindings').value + '[' + item.collection.indexOf(item) + ']',
                widgetMap: this.widgetMap
            });
        },

        addItem: function (event) {
            event.preventDefault();
            event.stopPropagation();

            this.collection.add({});
        }
    });

    return Repeater;

});
