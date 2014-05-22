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
// Use Marionette.Resources Application API
App = new Marionette.Application();
App.redirectTo("game", {id: 1});
    
// ...instead of referring to a route directly
App = new Marionette.Application();
Backbone.history.navigate("games/1", {trigger: true});
```
...and templates:

```html
<!-- Use Marionette.Resources Template Helpers API -->
<a href="<%= getPath('game', {id: 1}) %>">Show game 1</a>

<!-- ...instead of referring to a route directly... -->
<a href="#games/1">Show game 1</a>
```

###How do I use resources?###

