import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route('resultset',{path:'search/:id'},function(){
		this.route('chart',{path:'chart/:id'});
	});
});

export default Router;
