import Ember from 'ember';


export default Ember.Controller.extend({
	//I assume that the data will be continue to served by Yahoo in descending date order.
   	//We could think about sorting the rows, if we don't trust that assumption.
	minDate:function(){
		return this.model.get('chartrows').get('lastObject').get('date');
	}.property('chartrows'),
	maxDate:function(){
		return this.model.get('chartrows').get('firstObject').get('date')
	}.property('chartrows'),
	chartArray:function(){
		return this.model.get('chartrows').map(function(row){
            return [row.get('date'),row.get('open'),row.get('high'),row.get('low'),row.get('close')];
        });
	}.property('chartrows')

    /*modelChanged:function(){
    	debugger;
    	//I assume that the data will be continue to served by Yahoo in descending date order.
    	//We could think about sorting the rows, if we don't trust that assumption.
    	var chartrows=this.get('chartrows');
    	this.set('minDate',chartrows.get('lastObject').get('date'));
    	this.set('maxDate',chartrows.get('firstObject').get('date'));
    	var chartArray=chartrows.map(function(model){
            return [model.get('date'),model.get('open'),model.get('high'),model.get('low'),model.get('close')];
        });
        this.set('chartArray,chartArray');
    }.observes('model')*/
});