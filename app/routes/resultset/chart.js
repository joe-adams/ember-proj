import Ember from 'ember';

export default Ember.Route.extend({
    model: function(id) {
    	id=id.id
        var stock = this.store.getById('stock', id);
        return this.store.find('chartrow', id).then(function(chartrows) {
            var obj={id:stock.get('id'),stock:stock,chartrows:chartrows};
            var record= this.store.createRecord('chart', obj);
            return record;
        }.bind(this));
    }
});
