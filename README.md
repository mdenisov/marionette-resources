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
      , action: function (id) { new GamesApp.Show.Controller({id:id}); }
    }
};
```

###Why use resources?###
Using resources decouples the route components from the app, controllers, views:

```js
// Use Resources Application API...
App = new Marionette.Application();
App.redirectTo("game", {id: 1});
    
// Instead of referring to route directly...
App = new Marionette.Application();
Backbone.history.navigate("games/1", {trigger: true});
```
...and templates:

```html
<!-- Use Resources Template Helpers API... -->
<a href="<%= getPath('game', {id:id}) %>">Show game</a>

<!-- Instead of referring to route directly... -->
<a href="#games/<%= id %>">Show game</a>
```
