require.config({
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        backbone: 'bower_components/backbone-amd/backbone',
        marionette: 'bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': 'bower_components/backbone.wreqr/lib/backbone.wreqr',
        'backbone.babysitter': 'bower_components/backbone.babysitter/lib/backbone.babysitter',
        text: 'bower_components/requirejs-text/text',
        'backbone.stickit': 'bower_components/backbone.stickit/backbone.stickit',
        cocktail: 'bower_components/cocktail/Cocktail',
        'nested-model': 'bower_components/backbone-nested-model/backbone-nested'
    },
    shim: {
        'nested-model': {
            deps: ['backbone'],
            init: function (Backbone) {
                'use strict';

                return Backbone.NestedModel;
            }
        }
    }
});

// So we can use simple, sugared syntax rather than having a big
// list of dependencies in our main. This is a bit funky, but it helps
// keep the require statement below small, and lets us do our bootstrapping
// in a way similar to normal module loading: define(function(require){});
define('app-bootstrap', function (require) {

    'use strict';

    var FormView = require('app/widgets/form');
    var $ = require('jquery');
    var Node = require('app/node');
    var Backbone = require('backbone');
    var NestedModel = require('nested-model');

    var formDefinition = new Node(require('app/data/simple-form'), {
        parse: true
    });

    var person = new NestedModel(require('app/data/person'));

    var formView = new FormView({
        model: formDefinition,
        entity: person
    });

    $('#app').append(formView.render().el);

    person.on('change', function () {
        $('#log').html(JSON.stringify(person.toJSON(), null, '  '));
    });

    Backbone.history.start();

});

require(['jquery'], function ($) {
    'use strict';

    $(function () {
        require(['app-bootstrap']);
    });
});
