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
};
```

###Why use resources?###
Using resources decouples the route components from the app, controllers, views:

```js
// Use Resources Application API...
App = new Marionette.Application();
App.redirectTo("game", {id: 1});
    
// Instead of referring to routes directly...
App = new Marionette.Application();
Backbone.history.navigate("games/1", {trigger: true});
```
...and from templates:

```js
// Use Resources Template Helpers API...
```
