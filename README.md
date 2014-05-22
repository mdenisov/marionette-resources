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
Resources need to be added to `Marionette.Resources` in order to expose them to the APIs. This can be done by passing them to the `Marionette.Resources.add` method or adding them to an AppRouter. Adding resources to the AppRouter will also configure the routes on instantiation. Resources with both url and action methods parsed into routes.

```js
// Add resources to the "appResources" property of the AppRouter.
Router = Marionette.AppRouter.extend({
  appResources: {
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
  }
});

// Instantiate the router to configure the routes using the resources.
router = new Router();

// Generated appRoutes using resource name and url method.
router.appRoutes["games"]     // => "games"
router.appRoutes["games/:id"] // => "game"


// Generated controller using resource name and action method.
router.controller["games"] // => function () { new GamesApp.List.Controller(); }
router.controller["game"]  // => function (id) { new GamesApp.Show.Controller({id: id}); }
```
    
        
