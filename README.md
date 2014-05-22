marionette-resources
====================

###What are resources?###
Resources are named sets of route components.

```js
resources = {
    "games": {
        root  : true
      , url   : function () { return "games"; }
      , path  : _.template("#games")
      , action: function () { new GamesApp.List.Controller(); }
    }
  , "game": {
      , url   : function () { return "games/:id"; }
      , path  : _.template("#games/<%= id %>")
      , action: function (id) { new GamesApp.Show.Controller({id: id}); }
    }
};
```

###Why use resources?###
Using resources decouples the route components from the app, controllers, views:

```js
// Use Marionette.Resources Application API...
App = new Marionette.Application();
App.redirectTo("game", {id: 1});
    
// Instead of referring to route directly...
App = new Marionette.Application();
Backbone.history.navigate("games/1", {trigger: true});
```
...and templates:

```html
<!-- Use Marionette.Resources Template Helpers API... -->
<a href="<%= getPath('game', {id: 1}) %>">Show game 1</a>

<!-- Instead of referring to route directly... -->
<a href="#games/1">Show game 1</a>
```

###How do I use resources?###
Adding resources to Marionette.Resources makes them available to the Application and Template Helper APIs.

```js
Marionette.Resources.add({
  "edit_game": {
      url   : function () { return "#games/:id/edit"; }
    , path  : _.template("#games/<%= id %>/edit")
    , action: function (id) { new GamesApp.Edit.Controller({id: id});
});

App = new Marionette.Application();
App.getPath("edit_game", {id: 1}); // => "#games/1/edit
```

