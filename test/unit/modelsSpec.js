(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  describe('AngularModel', function() {
    beforeEach(function() {
      var Model;
      Model = (function(_super) {

        __extends(Model, _super);

        function Model() {
          Model.__super__.constructor.apply(this, arguments);
        }

        return Model;

      })(AngularModel);
      return this.model = new Model();
    });
    it('can be created with no params', function() {
      return expect(this.model.initialize).toBeDefined();
    });
    return describe('with initialized has_many', function() {
      beforeEach(function() {
        var SubModel;
        SubModel = (function() {

          function SubModel() {}

          SubModel.prototype.initialize = function() {
            return this.initialized = true;
          };

          return SubModel;

        })();
        this.model.hasMany = {
          sub_models: SubModel
        };
        this.model.sub_models = [{}];
        return this.model.initialize();
      });
      it('calls initialize on the associated class', function() {
        return expect(this.model.sub_models[0].initialized).toEqual(true);
      });
      return it('assigns its hasMany the associated class', function() {
        return expect(this.model.sub_models[0].constructor.name).toEqual("SubModel");
      });
    });
  });

}).call(this);
