import DS from 'ember-data';

export default DS.Model.extend({
    stocks: DS.hasMany('stock'),
    search: DS.attr('string')
});
