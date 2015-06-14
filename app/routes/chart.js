import Ember from 'ember';

export default Ember.Route.extend({
    model: function(id) {
        debugger;
        var stockModel = this.store.getById('stock', id.id);
        var result = stockModel.toJSON();
        return this.store.find('chartrow', id).then(function(chartrows) {
            result.chartrows=chartrows;
            debugger;
            var record= this.store.createRecord('chart', result);
            return record;
        }.bind(this));
    }
});
