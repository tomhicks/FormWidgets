define(function(require) {

    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var template = require('text!./repeater.html');

    var RepeaterItem = Marionette.CompositeView.extend(_.extend({

        tagName: 'div',

        template: _.template(require('text!./repeater-item.html')),
        itemViewContainer: '.repeater-item-contents',

        itemView: Backbone.View,

        widgetMap: {},

        events: {
            'click .remove-item': 'onRemoveItemClick'
        },

        initialize: function (options) {
            this.entity = options.entity;
            this.bindingBasePath = options.bindingBasePath;
            this.widgetMap = options.widgetMap;
        },

        setBindingBasePath: function (bindingBasePath) {
            this.bindingBasePath = bindingBasePath;

            this.children.each(function (child) {
                child.setBindingBasePath(this.bindingBasePath);
            }, this);

            return this;
        },

        onRemoveItemClick: function (event) {
            event.preventDefault();
            event.stopPropagation();

            this.model.destroy();
        }
    }, require('./behaviors/build-bound-item-view')));

    var Repeater = Marionette.CompositeView.extend(_.extend({

        events: {
            'click .add-item': 'addItem'
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
            this.collection = new Backbone.Collection(this.entity.get(this.getBindingPathPrefix() + this.model.get('bindings').value));
            
            // this all should be reversed so that the collection listens to changes on the entity.
            // A bug in nested model currently prevents this: https://github.com/afeld/backbone-nested/pull/117
            this.listenTo(this.collection, 'add', function () {
                // ensure an array in the entity
                if (!this.entity.get(this.getBindingPathPrefix() + this.model.get('bindings').value)) {
                    this.entity.set(this.getBindingPathPrefix() + this.model.get('bindings').value, [{}]);
                } else {
                    this.entity.add(this.getBindingPathPrefix() + this.model.get('bindings').value, {});
                }
            }, this);

            this.listenTo(this.collection, 'remove', function (model, collection, options) {
                this.entity.remove(this.getBindingPathPrefix() + this.model.get('bindings').value + '[' + options.index + ']');
                _.defer(this.updateChildViewBindingPaths.bind(this));
            }, this);
        },

        setBindingBasePath: function (bindingBasePath) {
            this.bindingBasePath = bindingBasePath;
            this.updateChildViewBindingPaths();
        },

        updateChildViewBindingPaths: function () {
            this.children.each(function (childView, index) {
                childView.setBindingBasePath(this.getBindingBasePathForIndex(index));
            }, this);
        },

        getBindingBasePathForIndex: function (index) {
            return this.getBindingPathPrefix() + this.model.get('bindings').value + '[' + index + ']';
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
                bindingBasePath: this.getBindingBasePathForIndex(item.collection.indexOf(item)),
                widgetMap: this.widgetMap,
                model: item
            });
        },

        addItem: function (event) {
            event.preventDefault();
            event.stopPropagation();

            this.collection.add({});
        }
    }, require('./behaviors/get-binding-path-prefix')));

    return Repeater;

});
