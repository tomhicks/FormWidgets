define(function(require) {
    'use strict';

    var _ = require('underscore');
    var template = require('text!./form.html');
    var Marionette = require('marionette');
    var Cocktail = require('cocktail');

    require('backbone.stickit');

    var mixins = [
        require('./behaviors/create-view-model'),
        require('./behaviors/bind-entity-and-view-model')
    ];

    var FormWidget = Marionette.CompositeView.extend({
        tagName: 'form',

        template: _.template(template),
        attributes: {
            'data-widget-type': 'form',
            class: 'well'
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

        bindingBasePath: '',

        initialize: function (options) {
            _.extend(this, _.pick(options, this.storedOptions));
            this.collection = this.model.get('children');            
        },

        onRender: function () {
            this.stickit(this.viewModel);
        },

        buildItemView: function(formNode, ItemViewType, itemViewOptions) {
            var WidgetType = widgetMap[formNode.get('type')];
            var options;

            if (!WidgetType) {
                throw new Error('Widget type "' + formNode.get('type') + '" does not exist');
            }

            options = _.extend({
                model: formNode,
                entity: this.entity,
                bindingBasePath: this.bindingBasePath,
            }, itemViewOptions);

            if (WidgetType === widgetMap.repeater) {
                options.widgetMap = widgetMap;
            }

            return new WidgetType(options);
        }

    });

    var widgetMap = {
        button: require('./button'),
        date: require('./date'),
        repeater: require('./repeater'),
        text: require('./text'),
        form: FormWidget
    };

    Cocktail.mixin(FormWidget, mixins);
    return FormWidget;

});
