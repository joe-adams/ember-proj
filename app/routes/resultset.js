import Ember from 'ember';

export default Ember.Route.extend({
    model: function(id) {
    	id=id.id.toLowerCase();
        if (this.store.hasRecordForId('resultset',id)){
        	var result= this.store.getById('resultset',id);
        	return result;
        }
        var r= this.store.fetchById('resultset',id);
        return r;
    },events:{
    	chart:function(stock){
    		this.transitionTo('/chart',stock);
    	}
    }
});
