(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  describe('ApplicationRouter', function() {
    var ApplicationRouter;
    ApplicationRouter = (function(_super) {

      __extends(ApplicationRouter, _super);

      function ApplicationRouter() {
        ApplicationRouter.__super__.constructor.apply(this, arguments);
      }

      return ApplicationRouter;

    })(Router);
    beforeEach(function() {
      var $browser, myCtrl1, scope;
      scope = angular.scope();
      $browser = scope.$service('$browser');
      ApplicationRouter.$inject = ['$route', '$xhr'];
      return myCtrl1 = scope.$new(ApplicationRouter);
    });
    return it('should ....', function() {});
  });

}).call(this);
