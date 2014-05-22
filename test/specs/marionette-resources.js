var AppRouter = Marionette.AppRouter
  , Resources = Marionette.Resources
  , View      = Marionette.View
  , mock
  ;

describe("Marionette.Resources", function () {
  beforeEach(function () {
    Resources.hash = getResources();
    mock           = getResources();
  });


  describe("#add", function () {
    beforeEach(function () {
      Resources.hash = {};
    });

    it("should add resources to hash", function () {
      Resources.add(mock);
      expect(Resources.hash).toEqual(mock);
    });
  });


  describe("#remove", function () {
    it("should remove resources from hash", function () {
      Resources.remove(mock);
      expect(Resources.hash).toEqual({});
    });
  });


  describe("#getPath", function () {
    it("should return a resource path", function () {
      expect(Resources.getPath("foo", {id:1})).toBe("#foos/1");
    });
  });


  describe("#linkTo", function () {
    it("should create a link to resource path", function () {
      var a = Resources.linkTo("Foo", Resources.getPath("foo", {id: 2}));
      expect(a).toEqual('<a href="#foos/2">Foo</a>')
    });
    it("should create a link to resource path by resource name", function () {
      var a = Resources.linkTo("Foo", "foo", {id: 1});
      expect(a).toEqual('<a href="#foos/1">Foo</a>');
    });
  });


  describe("#redirectTo", function () {
    it("should navigate to a resource path and call the action method", function () {
      spyOn(Backbone.history, "navigate");
      Resources.redirectTo("foo", {id:1});
      expect(Backbone.history.navigate).toHaveBeenCalledWith("#foos/1", {trigger:true});
    });
  });


  describe("#redirectToRoot", function () {
    it("should navigate to root resource path and call the action method.", function () {
      spyOn(Backbone.history, "navigate");
      Resources.redirectToRoot();
      expect(Backbone.history.navigate).toHaveBeenCalledWith("#foos", {trigger:true});
    });
  });


  describe("#render", function () {
    it("should call action method of a resource", function () {
      spyOn(Resources.hash.foo, "action");
      Resources.render("foo", 1, 2, 3);
      expect(Resources.hash.foo.action).toHaveBeenCalledWith(1, 2, 3);
    });
  });
});


describe("Marionette.AppRouter", function () {
  beforeEach(function () {
    Resources.hash = {};
    mock = getResources();
  });


  it("should add appResources to Resources hash", function () {
    new AppRouter({appResources: mock});
    expect(Resources.hash).toEqual(mock);
  });

  it("should create appRoutes hash", function () {
    var router = new AppRouter({appResources: mock});
    expect(router.appRoutes).toEqual(getRoutesHash());
  });

  it("should create controller", function () {
    var router = new AppRouter({appResources: mock})
      , jsonA  = JSON.stringify(router.controller)
      , jsonB  = JSON.stringify(getRoutesController())
      ;
    expect(jsonA).toBe(jsonB);
  });
});


describe("Marionette.View", function () {
  var view;
  beforeEach(function () {
    view = new Marionette.ItemView({
      model: new Backbone.Model()
    });
  });

  it("should add Resources methods to template helpers", function () {
    spyOn(Marionette.Renderer, "render");
    view.render();
    expect(Marionette.Renderer.render).toHaveBeenCalledWith(
        undefined
      , View.defaultTemplateHelpers
    );
  });
});