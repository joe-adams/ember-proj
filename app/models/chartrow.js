import DS from 'ember-data';

export default DS.Model.extend({
	date:DS.attr(),
	high:DS.attr(),
	low:DS.attr(),
	open:DS.attr(),
	close:DS.attr()
});