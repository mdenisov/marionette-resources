function getResources() {
  return {
      "foos": {
          root  : true
        , url   : function () { return "foos"; }
        , path  : _.template("#foos")
        , action: function (p, o) { console.log("foos"); }
      }

    , "foo": {
          url   : function () { return "foos/:id"; }
        , path  : _.template("#foos/<%= id %>")
        , action: function (p, o) { console.log("foo");    }
      }

    , "edit_foo": {
          url   : function () { return "foos/:id/edit"; }
        , path  : _.template("#foos/<%= id %>/edit")
        , action: function (p, o) { console.log("foos/:id/edit"); }
      }

    , "new_foo": {
          url   : function () { return "foos/new"; }
        , path  : _.template("#foos/new")
        , action: function (p, o) { console.log("foos/new"); }
      }
  };
}

function getRoutesHash() {
  var resources = getResources()
    , routes    = {}
    ;
  _.each(resources, function (resource, name) {
    routes[ resource.url() ] = name
  });
  return routes;
}

function getRoutesController() {
  var resources = getResources()
    , ctrl      = {}
    ;
  _.each(resources, function (resource, name) {
    ctrl[ name ] = resource.action
  });
  return ctrl;
}