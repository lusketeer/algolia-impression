Backbone.Router = Backbone.Router.extend({
  _swapView: function(view, title) {
    // setting page title
    // $("title").text(title || "Bvb");
    // $("h3.page-header").text(title || "Bvb");
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
