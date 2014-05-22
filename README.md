marionette-resources
====================

###What are resources?###
Resources contain information about routes and actions.

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


