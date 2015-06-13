import DS from 'ember-data';
import Stock from 'ember-proj/models/stock'

export default DS.Model.extend({
	chartrows:DS.hasMany('chartrow'),
	symbol:DS.attr('string'),
	name:DS.attr('string'),
	//I assume that the data will be continue to served by Yahoo in descending date order.
   	//We could think about sorting the rows, if we don't trust that assumption.
	minDate:function(){
		debugger;
		return this.get('chartrows').get('lastObject').get('date');
	}.property('chartrows'),
	maxDate:function(){
		debugger;
		return this.get('chartrows').get('firstObject').get('date')
	}.property('chartrows'),
	chartArray:function(){
		debugger;
		return this.get('chartrows').map(function(row){
            return [row.get('date'),row.get('open'),row.get('high'),row.get('low'),row.get('close')];
        });
	}.property('chartrows')
});