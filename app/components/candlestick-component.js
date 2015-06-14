import App from 'ember-proj/app';

export default App.CandlestickComponent = Ember.Component.extend({
    getChartData:function(){
        //I don't like doing all this here, but I ran into roadblocks with all alternatives.
        //I assume that the data will be continue to served by Yahoo in descending date order.
        //We could think about sorting the rows, if we don't trust that assumption.
        var chartrows=this.get('series').get('chartrows');
        var minDate=chartrows.get('lastObject').get('date');
        var maxDate=chartrows.get('firstObject').get('date');
        var chartArray=chartrows.map(function(row){
            return [row.get('date'),row.get('open'),row.get('high'),row.get('low'),row.get('close')];
        });
        return {minDate:minDate,maxDate:maxDate,chartArray:chartArray};
    },
    makeChart: function() {
        debugger;
        var chartData=this.getChartData();
        var data=chartData.chartArray;
        var maxDate=chartData.minDate;
        var minDate=chartData.maxDate;


        var $el = $('#chart');
        $el.empty();
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
    //I tried just having it observe the properties it consumed in the above method, 
    //but it didn't work probably because they aren't observable.
    }.on('didInsertElement','parentViewDidChange').observes('series')
});
