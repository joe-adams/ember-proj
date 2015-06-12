/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

//app.import('bower_components/papaparse/papaparse.js');
app.import('vendor/complete.ly.1.0.1.js');
app.import('vendor/papaparse_see_comment.js');
app.import('bower_components/lodash/dist/lodash.js');
app.import('bower_components/moment/moment.js');

//app.import('bower_components/d3/d3.js');
//app.import('bower_components/TechanJS/dist/techan.js');

app.import('vendor/jqplot/jquery.jqplot.js');
app.import('vendor/jqplot/plugins/jqplot.dateAxisRenderer.js');
app.import('vendor/jqplot/plugins/jqplot.ohlcRenderer.js');
app.import('vendor/jqplot/plugins/jqplot.highlighter.js');


//Add Bootstrap glyphicons.  Not used, but if developers expect Bootstrap, then I figure they should be here.
app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.eot', {
    destDir: 'fonts'
});
app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.svg', {
    destDir: 'fonts'
});
app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf', {
    destDir: 'fonts'
});
app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff', {
    destDir: 'fonts'
});




// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
