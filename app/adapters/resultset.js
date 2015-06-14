import DS from 'ember-data';
import Ember from 'ember';


export default DS.Adapter.extend({
    findQuery: function(store, type, id, snapshot) {
        if (!id || id === '') {
            return store.all('stock');
        }
        var matcher = id.toLowerCase();
        return store.filter('stock', function(stock) {
            var name = stock.get('name').toLowerCase();
            return name.indexOf(matcher) === 0;
        });
    }
});
