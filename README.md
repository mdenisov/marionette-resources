marionette-resources
====================

###What is a resource?###

A resource contains information about a route and or action.

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

###Adding resources###

