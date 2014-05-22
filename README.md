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


