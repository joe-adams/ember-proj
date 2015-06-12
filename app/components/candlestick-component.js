import App from 'ember-proj/app';

export default App.CandlestickComponent = Ember.Component.extend({
    makeChart: function() {
        var $el = $('#chart');
        $el.empty();
        var dataModels = this.get('series');

        var data=dataModels.map(function(model){
            return [model.get('date'),model.get('open'),model.get('high'),model.get('low'),model.get('close')];
        });

        var maxDate=data[0][0];
        var minDate=data[data.length-1][0];
        $.jqplot('chart', [data], {
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
                    tickInterval: "1 week",
                },
                y2axis: {
                    tickOptions: {
                        formatString: '$%d'
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
