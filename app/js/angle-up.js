(function() {
  var Router,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __slice = Array.prototype.slice;

  Router = (function() {

    Router.prototype.initRoutes = function(routes) {
      var info, routeName;
      for (routeName in routes) {
        info = routes[routeName];
        if (routeName === "default") {
          this.$route.otherwise({
            redirectTo: info
          });
        } else {
          this.$route.when(routeName, {
            template: info.template,
            controller: info.controller
          });
        }
      }
      return this.$route.parent(this);
    };

    Router.prototype.setupXhr = function() {
      this.$xhr.defaults.headers.post['Content-Type'] = 'application/json';
      return this.$xhr.defaults.headers.put['Content-Type'] = 'application/json';
    };

    function Router($route, $xhr) {
      this.$route = $route;
      this.$xhr = $xhr;
      this.setupXhr();
      this.initRoutes(typeof this.routes === "function" ? this.routes() : void 0);
    }

    return Router;

  })();

  this.RailsRouter = (function(_super) {

    __extends(RailsRouter, _super);

    function RailsRouter() {
      RailsRouter.__super__.constructor.apply(this, arguments);
    }

    RailsRouter.prototype.setupXHR = function() {
      var token;
      RailsRouter.__super__.setupXHR.call(this);
      if (token = $("meta[name='csrf-token']").attr("content")) {
        this.$xhr.defaults.headers.post['X-CSRF-Token'] = token;
        this.$xhr.defaults.headers.put['X-CSRF-Token'] = token;
        return this.$xhr.defaults.headers['delete']['X-CSRF-Token'] = token;
      }
    };

    return RailsRouter;

  })(Router);

  this.resourceService = function() {
    var commandHash, methods, path, serviceName, type, _i, _len;
    serviceName = arguments[0], path = arguments[1], methods = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (methods.length === 0) {
      methods.push('index', 'create', 'update', 'destroy', 'show');
    }
    commandHash = {};
    for (_i = 0, _len = methods.length; _i < _len; _i++) {
      type = methods[_i];
      commandHash[type] = (function() {
        switch (type) {
          case 'index':
            return {
              method: 'GET',
              isArray: true
            };
          case 'show':
            return {
              method: 'GET',
              isArray: false
            };
          case 'create':
            return {
              method: 'POST'
            };
          case 'update':
            return {
              method: 'PUT'
            };
          case 'destroy':
            return {
              method: 'DELETE'
            };
        }
      })();
    }
    return angular.service(serviceName, function($resource) {
      return $resource(path, {}, commandHash);
    });
  };

  angular.element(document).ready(function() {
    return angular.compile(document)().$apply();
  });

  this.AngularModel = (function() {

    function AngularModel() {}

    AngularModel.prototype.initialize = function() {
      var clazz, name, obj, _i, _len, _ref, _ref2, _results;
      if (this.hasMany) {
        _ref = this.hasMany;
        for (name in _ref) {
          clazz = _ref[name];
          this[name] || (this[name] = []);
        }
        _ref2 = this[name];
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          obj = _ref2[_i];
          obj.__proto__ = new clazz();
          _results.push(typeof obj.initialize === "function" ? obj.initialize() : void 0);
        }
        return _results;
      }
    };

    return AngularModel;

  })();

  angular.service("eventuallyWork", (function($defer) {
    var eventuallyWork;
    eventuallyWork = function(func, timeout) {
      try {
        return func();
      } catch (e) {
        return $defer((function() {
          return eventuallyWork(func, 2 * timeout);
        }), timeout);
      }
    };
    return function(func) {
      return eventuallyWork(func, 10);
    };
  }), {
    $inject: ['$defer']
  });

  this.autowrap = function(clazz, callback) {
    return function(result) {
      result.__proto__ = new clazz();
      if (typeof result.initialize === "function") result.initialize();
      if (callback) return callback(result);
    };
  };

}).call(this);
