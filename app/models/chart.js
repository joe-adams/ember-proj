import DS from 'ember-data';

export default DS.Model.extend({
	stock:DS.attr('stock'),
    chartrows: DS.hasMany('chartrow'),
    minDate: function() {
        return this.get('chartrows').get('lastObject').get('date');
    }.property('chartrow'),
    maxDate: function() {
        return this.get('chartrows').get('firstObject').get('date');
    }.property('chartrow'),
    chartArray: function() {
        return this.get('chartrows').map(function(row) {
            return [row.get('date'), row.get('open'), row.get('high'), row.get('low'), row.get('close')];
        });
    }.property('chartrow')
});
