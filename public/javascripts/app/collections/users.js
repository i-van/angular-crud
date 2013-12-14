define(['backbone', 'models/user'], function(Backbone, User) {
    return Backbone.Collection.extend({
        url: "/api/users",
        model: User,
        parse: function(res) {
            this.itemsPerPage = res.itemsPerPage;
            this.currentPage = res.currentPage;
            this.totalItems = res.totalItems;
            return res.data
        }
    })
});