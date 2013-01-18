(function() {
  var inheritClazz, module,
    __slice = [].slice,
    _this = this;

  this.RailsRouter = (function() {

    function RailsRouter() {}

    RailsRouter.prototype.setupXHR = function() {
      var token;
      if (token = $("meta[name='csrf-token']").attr("content")) {
        this.$xhr.defaults.headers.post['X-CSRF-Token'] = token;
        this.$xhr.defaults.headers.put['X-CSRF-Token'] = token;
        return this.$xhr.defaults.headers['delete']['X-CSRF-Token'] = token;
      }
    };

    return RailsRouter;

  })();

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

  inheritClazz = function(obj, clazz) {
    var key, objProto, value;
    objProto = new clazz();
    for (key in objProto) {
      value = objProto[key];
      obj[key] = value;
    }
    obj.constructor = objProto.constructor;
    return typeof obj.initialize === "function" ? obj.initialize() : void 0;
  };

  this.AngularModel = (function() {

    function AngularModel() {}

    AngularModel.prototype.initialize = function() {
      var clazz, name, obj, _ref, _results;
      if (this.hasMany) {
        _ref = this.hasMany;
        _results = [];
        for (name in _ref) {
          clazz = _ref[name];
          this[name] || (this[name] = []);
          _results.push((function() {
            var _i, _len, _ref1, _results1;
            _ref1 = this[name];
            _results1 = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              obj = _ref1[_i];
              _results1.push(inheritClazz(obj, clazz));
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }
    };

    return AngularModel;

  })();

  module = angular.module("eventuallyWork", ['$defer']);

  module.factory('serviceId', function() {
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
  });

  this.adaptForAngular = function() {
    var alias, clazz, injections;
    clazz = arguments[0], alias = arguments[1], injections = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    injections.push("$scope");
    window[alias] = function() {
      var args, controller, key, observer, scope, value, _i, _j, _len, _ref, _results;
      args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), scope = arguments[_i++];
      controller = new clazz();
      for (key in controller) {
        value = controller[key];
        scope[key] = value;
      }
      if (typeof scope.initializeInjections === "function") {
        scope.initializeInjections.apply(scope, args);
      }
      scope.$scope = scope;
      _ref = clazz.$observers || [];
      _results = [];
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        observer = _ref[_j];
        _results.push(new observer(scope));
      }
      return _results;
    };
    return window[alias].$inject = injections;
  };

  this.JqueryObserver = (function() {

    function JqueryObserver($scope) {
      var _this = this;
      this.$scope = $scope;
      $(function() {
        if (typeof _this.onReady === "function") {
          _this.onReady();
        }
        return _this.$scope.$digest();
      });
    }

    return JqueryObserver;

  })();

  this.autowrap = function(clazz, callback) {
    return function(result) {
      inheritClazz(result, clazz);
      if (callback) {
        return callback(result);
      }
    };
  };

}).call(this);
