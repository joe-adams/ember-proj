import DS from 'ember-data';

export default DS.Model.extend({
    stocks: DS.hasMany('stock'),
    search: DS.attr('string'),
    matches: function() {
        var matcher = this.get('search') && this.get('search').toLowerCase();
        if (!matcher) {
            return this.get('stocks');
        }
        var arr = this.get('stocks').filter(function(stock) {
            var name = stock.get('name').toLowerCase();
            return name.indexOf(matcher) === 0;
        });
        return arr;
    }.property('stocks', 'search')
});
