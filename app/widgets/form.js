define(function(require) {
    'use strict';

    var _ = require('underscore');
    var template = require('text!./form.html');
    var Marionette = require('marionette');

    var widgetMap = {
        button: require('./button'),
        date: require('./date'),
        repeater: require('./repeater'),
        text: require('./text')
    };

    return Marionette.CompositeView.extend({
        tagName: 'form',
        template: _.template(template),
        attributes: {
            'data-widget-type': 'form'
        },

        itemViewContainer: '.form-contents',

        storedOptions: [
            'entity',
            'model'
        ],

        initialize: function (options) {
            _.extend(this, _.pick(options, this.storedOptions));
            this.collection = this.model.get('children');
        },

        buildItemView: function(formNode, ItemViewType, itemViewOptions) {
            var WidgetType = widgetMap[formNode.get('type')];
            var options;

            if (!WidgetType) {
                throw new Error('Widget type "' + formNode.get('type') + '" does not exist');
            }

            options = _.extend({
                model: formNode,
                entity: this.entity

            }, itemViewOptions);

            return new WidgetType(options);

        }

    });
});
