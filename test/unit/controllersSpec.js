(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  describe('Main Router', function() {
    describe('by default', function() {
      beforeEach(function() {
        var $browser, TestRouter, scope;
        TestRouter = (function(_super) {

          __extends(TestRouter, _super);

          function TestRouter() {
            TestRouter.__super__.constructor.apply(this, arguments);
          }

          return TestRouter;

        })(RailsRouter);
        scope = angular.scope();
        $browser = scope.$service('$browser');
        TestRouter.$inject = ['$route', '$xhr'];
        return this.router = scope.$new(TestRouter);
      });
      return describe('has default headers', function() {
        beforeEach(function() {
          return this.headers = this.router.$xhr.defaults.headers;
        });
        return it('should set content type to json', function() {
          expect(this.headers.put['Content-Type']).toEqual("application/json");
          return expect(this.headers.post['Content-Type']).toEqual("application/json");
        });
      });
    });
    return describe('with routes', function() {
      var Controller1;
      Controller1 = null;
      beforeEach(function() {
        var $browser, TestRouter, scope;
        Controller1 = (function() {

          function Controller1() {}

          return Controller1;

        })();
        TestRouter = (function(_super) {

          __extends(TestRouter, _super);

          function TestRouter() {
            TestRouter.__super__.constructor.apply(this, arguments);
          }

          TestRouter.prototype.routes = function() {
            return {
              "default": "/dft",
              "/dft": {
                template: "/template.html",
                controller: Controller1
              }
            };
          };

          return TestRouter;

        })(Router);
        scope = angular.scope();
        $browser = scope.$service('$browser');
        TestRouter.$inject = ['$route', '$xhr'];
        return this.router = scope.$new(TestRouter);
      });
      it('takes route info', function() {
        expect(this.router.$route.routes['/dft'].template).toEqual("/template.html");
        return expect(this.router.$route.routes['/dft'].controller).toEqual(Controller1);
      });
      return it('has default route assignment', function() {
        return expect(this.router.$route.routes["null"].redirectTo).toEqual("/dft");
      });
    });
  });

}).call(this);
