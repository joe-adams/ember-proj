import DS from 'ember-data';
import Stock from 'ember-proj/models/stock'

export default DS.Model.extend({
	chartrows:DS.hasMany('chartrow'),
	symbol:DS.attr('string'),
	name:DS.attr('string')
});