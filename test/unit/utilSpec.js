(function() {

  describe('autoWrap', function() {
    beforeEach(function() {
      var StringWrapper;
      StringWrapper = (function() {

        function StringWrapper() {}

        return StringWrapper;

      })();
      this.obj = {
        objectId: "myId"
      };
      return autowrap(StringWrapper)(this.obj);
    });
    it("preserves fields", function() {
      return expect(this.obj.objectId).toEqual("myId");
    });
    return it("assigns prototype", function() {
      return expect(this.obj.constructor.name).toEqual("StringWrapper");
    });
  });

}).call(this);
