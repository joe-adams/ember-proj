import Ember from 'ember';

export default Ember.Controller.extend({
    actions:{
        chart:function(stock){
            this.transitionToRoute('chart',stock);
        }
    }
});
