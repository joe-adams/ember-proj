import DS from 'ember-data';
import Ember from 'ember';


export default DS.Adapter.extend({
    find: function(store, type, id, snapshot) {
        var stocks=store.all('stock').filter(function(stock) {
                var name = stock.get('name').toLowerCase();
                return (name.indexOf(id) === 0);
            });
        //The promise might not be necessary.
        return new Ember.RSVP.Promise(function(resolve,reject){
            Ember.run(null,resolve,{id:id,stocks:stocks});
        });
    }
});
