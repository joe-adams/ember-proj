import Ember from 'ember';

export default Ember.Route.extend({
    model: function(symbol) {
    	return this.store.find('chartrow',symbol);
    }
});