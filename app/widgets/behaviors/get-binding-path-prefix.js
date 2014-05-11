'use strict';

define({
    getBindingPathPrefix: function () {
        return this.bindingBasePath ? this.bindingBasePath + '.' : '';
    }
});
