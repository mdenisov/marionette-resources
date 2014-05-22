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
// Use Marionette.Resources API via App object...
App.on("start", function () {
  Backbone.history.start();
  if (!Backbone.history.fragment) {
    App.redirectToRoot({}, {replace: true});
  }
});
    
// Instead of referring to routes directly...
App.on("start", function () {
  Backbone.history.start();
  if (!Backbone.history.fragment) {
    Backbone.history.navigate("games", {
      trigger: true,
      replace: true
    });
  }
});
```
