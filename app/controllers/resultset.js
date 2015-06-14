export default Ember.Controller.extend({
    actions:{
        chart:function(stockId){
        	//window.location.pathname
        	//this.transitionToRoute(window.location.pathname+'chart',stockId);
        	this.transitionToRoute('search.chart',stockId);
        }
    }
});