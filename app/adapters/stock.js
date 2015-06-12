import DS from 'ember-data';
import Ember from 'ember';


export default DS.Adapter.extend({
    findAll: function(store, type, id, snapshot) {
        var promiseFactory = function(url) {
            return new Promise(function(resolve, reject) {
                Papa.parse(url, {
                    download: true,
                    header: true,
                    delimiter: ",",
                    newline: ",\n",
                    skipEmptyLines: true,
                    error: function(error) {
                        reject(error);
                    },
                    complete: function(results) {
                        var correctForm = results.data.map(function(item) {
                            return {
                                //Papa parse is good, but I think it leaves things needing to be trimmed.
                                id: item.Symbol.trim(),
                                symbol: item.Symbol.trim(),
                                name: item.Name.trim()
                            };
                        });
                        resolve(correctForm);
                    }
                });
            });
        };
        var promises = [promiseFactory('csv/amex.csv'), promiseFactory('csv/nasdaq.csv'), promiseFactory('csv/nyse.csv')];

        //I sort the data here.  If I knew Ember more, there would probalby be a better way.
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Promise.all(promises).then(function(results) {
                var all = _.flatten(results).sort(function(a, b) {
                    var nameA = a.name.toLowerCase();
                    var nameB = b.name.toLowerCase();
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    var symbolA = a.symbol;
                    var symbolB = b.symbol;
                    if (symbolA < symbolB)
                        return -1;
                    if (symbolA > symbolB)
                        return 1;
                    return 0;
                });
                Ember.run(null, resolve, all);
            });
        });
    }
});
