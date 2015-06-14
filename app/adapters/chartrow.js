import DS from 'ember-data';
import Ember from 'ember';

var $ = Ember.$;

//How to make the url: https://code.google.com/p/yahoo-finance-managed/wiki/csvHistQuotesDownload
//http://momentjs.com/docs/#/get-set/
//http://momentjs.com/docs/#/manipulating/
var makeUrl = function(id) {
    var startDate = moment().subtract(30, 'days');
    var endDate = moment();

    var startYear = startDate.year();
    var startMonth = startDate.month(); //Yahoo and moment agree the months are 0-11
    var startDay = startDate.date();

    var endYear = endDate.year();
    var endMonth = endDate.month();
    var endDay = endDate.date();
    var encodedId = encodeURIComponent(id);

    return 'table.csv?s=' + encodedId + '&a=' + startMonth + '&b=' + startDay + '&c=' + startYear + '&d=' + endMonth + '&e=' + endDay + '&f=' + endYear + '&g=d&ignore.csv';
};


//Ember seems to be randomly asking for find or findQuery.
export default DS.Adapter.extend({
    findQuery: function(store, type, id, snapshot) {

        var url = makeUrl(id);
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Papa.parse(url, {
                download: true,
                header: true,
                delimiter: ",",
                newline: ",\n",
                //This converts to data to numbers when necessary
                dynamicTyping: true,
                skipEmptyLines: true,
                error: function(error) {
                    reject(error);
                },
                complete: function(results) {
                    var data = results.data;
                    var correctedData = data.map(function(dataRow) {
                        var date = moment(dataRow.Date, 'YYYY-MM-DD');
                        var formattedDate = date.format('MM/DD/YYYY HH:mm:ss');
                        return {
                            id: _.uniqueId(),
                            date: formattedDate,
                            open: dataRow.Open,
                            high: dataRow.High,
                            low: dataRow.Low,
                            close: dataRow.Close
                        }
                    });
                    Ember.run(null, resolve, correctedData);
                }
            });
        });
    }
});
