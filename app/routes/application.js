import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
    	return this.store.findAll('stock').then(function(stocks){
    		return this.store.createRecord('application',{stocks:stocks});
    	}.bind(this));
    }
});
