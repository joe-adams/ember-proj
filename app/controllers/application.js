import Ember from 'ember';

export default Ember.Controller.extend({
	search:function(){
		var search=this.model.get('search');
		if (search){
			this.transitionToRoute('resultset',search);
		}
	}.observes('model.search')
});
