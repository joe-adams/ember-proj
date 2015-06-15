import App from 'ember-proj/app';
import Ember from 'ember';

var $=Ember.$;

export default App.CandlestickComponent = Ember.Component.extend({
    makeChart: function() {
        var chartArray = this.get('series').get('chartArray');
        var maxDate = this.get('series').get('maxDate');
        var minDate = this.get('series').get('minDate');
        //Ironically, I'm not finding anything about explicitly calling Handlebars in your code.
        var formatString = '<table class="jqplot-highlighter">';
        formatString += '<tr><td>date:</td><td>%s</td></tr>';
        formatString += '<tr><td>open:</td><td>%s</td></tr>';
        formatString += '<tr><td>hi:</td><td>%s</td></tr>';
        formatString += '<tr><td>low:</td><td>%s</td></tr>';
        formatString += '<tr><td>close:</td><td>%s</td></tr></table>';



        var $el = $('#chart');
        $el.empty();
        $.jqplot('chart', [chartArray], {
            seriesDefaults: {
                yaxis: 'y2axis'
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.DateAxisRenderer,
                    tickOptions: {
                        formatString: '%b %e'
                    },
                    min: minDate,
                    max: maxDate,
                    tickInterval: "5 days",
                },
                y2axis: {
                    tickOptions: {
                        formatString: '$%.2f'
                    }
                }
            },
            // To make a candle stick chart, set the "candleStick" option to true.
            series: [{
                renderer: $.jqplot.OHLCRenderer,
                rendererOptions: {
                    candleStick: true
                }
            }],
            highlighter: {
                show: true,
                showMarker: false,
                tooltipAxes: 'xy',
                yvalues: 4,
                formatString:formatString
            }
        });
        //I tried just having it observe the properties it consumed in the above method, 
        //but it didn't work probably because they aren't observable.
    }.on('didInsertElement', 'parentViewDidChange').observes('series')
});
