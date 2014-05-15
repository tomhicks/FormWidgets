require.config({
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        text: 'bower_components/requirejs-text/text',
        react: 'bower_components/react/react'
    }
});

// So we can use simple, sugared syntax rather than having a big
// list of dependencies in our main. This is a bit funky, but it helps
// keep the require statement below small, and lets us do our bootstrapping
// in a way similar to normal module loading: define(function(require){});
define('app-bootstrap', function (require) {

    'use strict';

    var React = require('react');

    var formDefinition = require('app/data/simple-form');
    var person = require('app/data/person');

    var form = require('app/widgets/form');

    React.renderComponent(form({
        entity: person,
        widgetDefinition: formDefinition,
        widgetMap: {
            form: form,
            text: require('app/widgets/text'),
            repeater: require('app/widgets/repeater')
        }
    }), document.getElementById('app'));

});

require(['jquery'], function ($) {
    'use strict';

    $(function () {
        require(['app-bootstrap'], function () {});
    });
});
