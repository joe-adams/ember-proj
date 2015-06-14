import Ember from 'ember';

export default Ember.Route.extend({
    model: function(id) {
        var stockModel = this.store.getById('stock', id.id);
        var result = stockModel.toJSON();
        return this.store.findQuery('chartrow', id.id).then(function(chartrows) {
        	debugger;
            result.chartrows=chartrows;
            var record= this.store.createRecord('chart', result);
            return record;
        }.bind(this));
    }
});
