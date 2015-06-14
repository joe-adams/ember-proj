import DS from 'ember-data';

export default DS.Model.extend({
    stocks: DS.hasMany('stock'),
    search: DS.attr('string'),
    resultSet: function() {
        var search=this.get('search');
        if(!search){
            return {stocks:this.get('stocks')};
        }
        search=search.toLowerCase();
        if (this.store.hasRecordForId('resultset',search)){
            return this.store.getById('resultset',search);
        }
        return this.store.fetchById('resultset',search);
    }.property('stocks', 'search')
});
