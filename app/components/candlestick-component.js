import App from 'ember-proj/app';

export default App.CandlestickComponent = Ember.Component.extend({
    makeChart: function() {

        var chartArray=this.get('chartArray');
        var maxDate=this.get('maxDate');
        var minDate=this.get('minDate');

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
                formatString: '<table class="jqplot-highlighter"> \
      <tr><td>date:</td><td>%s</td></tr> \
      <tr><td>open:</td><td>%s</td></tr> \
      <tr><td>hi:</td><td>%s</td></tr> \
      <tr><td>low:</td><td>%s</td></tr> \
      <tr><td>close:</td><td>%s</td></tr></table>'
            }
        });
    }.on('didInsertElement','parentViewDidChange').observes('series')
});
