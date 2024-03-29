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
      , action: function () { /*...*/ }
    }
  , "game": {
      , url   : function () { return "games/:id"; }
      , path  : _.template("#games/<%= id %>")
      , action: function (id) { /*...*/ }
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
        , action: function (id) { /* ... */ }
      }
  }
});

router.appRoutes  // => {"games/:id/edit": "edit_game"}
router.controller // => {"edit_game": function (id) { /* ... */ }}
App.getPath("edit_game", {id: 1}); // => "#games/1/edit"
```

###Can I create non-routable resources?###
Yes. In the case where a resource does not need to be routable, define it with only an action method.
```js
App = new Marionette.Application();
new Marionette.AppRouter({
  appResources: {
    "new_game": {
        action: function (region) { /* ... */ }
    }
  }
});

// Add a region to the app and render a "new_game" in it.
App.addRegions({"region": "#region"});
App.render("new_game", App.region);
```
