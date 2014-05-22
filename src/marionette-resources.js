// Marionette Resources (marionette-resources.js)
// v 1.0.0
// Chris Forrest
//
// https://github.com/chrisf74/marionette-resources
//
(function(Backbone, Marionette, _) {
  var Application = Marionette.Application
    , Resources   = Marionette.Resources = {}
    , AppRouter   = Marionette.AppRouter
    , View        = Marionette.View
    ;

  // Resources API
  _.extend(Resources, {
      hash: {}

    , add: function (resources) {
        if (!resources) return;
        _.extend(Resources.hash, resources);
      }

    , remove: function (resources) {
        if (!resources) return;
        _.each(resources, function (resource, name) {
          delete Resources.hash[name]
        });
      }

    , getPath: function (name, params) {
        var resource = Resources.hash[name] || {}
          , path     = resource.path
          ;
        if (path) return path(params);
      }

    , linkTo: function (text, name, params) {
        path = Resources.getPath(name, params) || name;
        return '<a href="'+path+'">'+text+'</a>';
      }

    , redirectTo: function (name, params, options) {
        var resource = Resources.hash[name] || {}
          , path     = resource.path
          ;
        options = options || {};
        if (path) {
          options.trigger = true;
          Backbone.history.navigate(path(params), options);
        }
      }

    , redirectToRoot: function (params, options) {
        var resources = Resources.hash || {}
          , resource  = _.findWhere(resources, {root: true}) || {}
          , path      = resource.path
          ;
        options = options || {};
        if (path) {
          options.trigger = true;
          Backbone.history.navigate(path(params), options);
        }
      }

    , render: function (name) {
        var resource = Resources.hash[name] || {}
          , action   = resource.action
          , args
          ;
        if (action) {
          args = Array.prototype.slice.call(arguments, 1);
          action.apply(resource, args);
        }
      }
  });


  // Extend the Marionette AppRouter to add appResources to
  // the Resources hash and parse them into a routes hash
  // and route methods. 
  Marionette.AppRouter = AppRouter.extend({
      constructor: function (attrs) {
        var controller = this.controller = {}
          , appRoutes  = this.appRoutes  = {}
          , action
          , url
          ;

        attrs = attrs || {};
        if (attrs.appResources) {
          this.appResources = attrs.appResources;
        }

        if (this.appResources) {
          Resources.add(this.appResources);

          _.each(this.appResources, function (resource, name) {
            action = resource.action;
            url    = resource.url;

            if (action && url) {
              controller[name] = action;
              appRoutes[url()] = name;
            }
          });
        }
        AppRouter.__super__.constructor
          .apply(this, arguments)
        ;
      }
  });


  // SUGAR. Add Resources methods to application instances.
  _.extend(Application.prototype, _.pick(Resources, 
      "getPath"
    , "linkTo"
    , "redirectTo"
    , "redirectToRoot"
    , "render"
  ));


  // Define default template helpers for all views, if necessary.
  // Mix them into the serialized data.
  if (!View.defaultTemplateHelpers) {
    View.defaultTemplateHelpers = {};

    View.prototype._mixinTemplateHelpers = View.prototype
      .mixinTemplateHelpers
    ;

    View.prototype.mixinTemplateHelpers = function (target) {
      _.extend(target, View.defaultTemplateHelpers);
      return this._mixinTemplateHelpers(target);
    };
  }


  // SUGAR. Add Resources methods to the views default
  // template helpers.
  _.extend(View.defaultTemplateHelpers, _.pick(Resources,
      "getPath"
    , "linkTo"
  ));
}(Backbone, Marionette, _));