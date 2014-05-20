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
                widgetMap: this.widgetMap
            }, itemViewOptions);

            return new WidgetType(options);
        }
    };
});
