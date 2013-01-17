(function() {

  this.MyCtrl1 = (function() {

    function MyCtrl1() {}

    return MyCtrl1;

  })();

  MyCtrl1.$inject = [];

  this.MyCtrl2 = (function() {

    function MyCtrl2() {}

    return MyCtrl2;

  })();

  MyCtrl2.$inject = [];

}).call(this);
