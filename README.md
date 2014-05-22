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
Using resources decouples the route components from the application, controllers, views:

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
Add resources to a `Marionette.AppRouter` class or instance with the name "appResources".

```js
// Add resources to an AppRouter class
Router = Marionette.AppRouter.extend({
  appResources: { /*...*/ }
});

// ...or instance
new Marionette.AppRouter({
  appResources: { /*...*/ }
});

```

Instantiating the `Marionette.AppRouter` will expose the `appResources` to the Resource APIs and automatically configure the routes. Each resource that contains both `url` and `action` methods will generate a route.

```js
App    = new Marionette.Application();
router = new Marionette.AppRouter({
  appResources: {
    "edit_game": {
          url   : function () { return "games/:id/edit"; }
        , path  : _.template("#games/<%= id %>/edit")
        , action: function (id) { new GamesApp.Edit.Controller({id: id}); }
      }
  }
});

router.appRoutes  // => {"games/:id/edit": "edit_game"}
router.controller // => {"edit_game": function (id) { new GamesApp.Edit.Controller({id: id}); }}

App.getPath("edit_game", {id: 1}); // => "#games/1/edit"
```
