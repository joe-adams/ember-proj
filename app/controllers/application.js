import Ember from 'ember';

var $ = Ember.$;

export default Ember.Controller.extend({
    actions:{
        chart:function(symbol){
            this.transitionTo('chart',symbol);
        }
    }
});
