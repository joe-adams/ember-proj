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
        }).sort(function(a, b) {
            //This is close to repetition from the adapter, but we have to use 'get' to get the properties.
            var nameA = a.get('name').toLowerCase();
            var nameB = b.get('name').toLowerCase();
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            var symbolA = a.get('symbol');
            var symbolB = b.get('symbol');
            if (symbolA < symbolB)
                return -1;
            if (symbolA > symbolB)
                return 1;
            return 0;
        });
        return arr;
    }.property('stocks', 'search')
});
