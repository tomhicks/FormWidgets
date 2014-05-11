define(function (require) {
    'use strict';

    var _ = require('underscore');

    return {
        buildItemView: function (formNode, ItemViewType, itemViewOptions) {
            var WidgetType = this.widgetMap[formNode.get('type')];
            var options;

            if (!WidgetType) {
                throw new Error('Widget type "' + formNode.get('type') + '" does not exist');
            }

            options = _.extend({
                model: formNode,
                entity: this.entity,
                bindingBasePath: this.bindingBasePath,
            }, itemViewOptions);

            if (WidgetType === this.widgetMap.repeater) {
                options.widgetMap = this.widgetMap;
            }

            return new WidgetType(options);
        }
    };
});
