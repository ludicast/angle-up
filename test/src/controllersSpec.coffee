describe 'Main Router', ->
  describe 'by default', ->
    beforeEach ->
      class TestRouter extends RailsRouter
      scope = angular.scope()
      $browser = scope.$service '$browser'
      TestRouter.$inject = ['$route','$xhr']
   
      @router = scope.$new TestRouter

    describe 'has default headers', ->
      beforeEach -> @headers = @router.$xhr.defaults.headers
      it 'should set content type to json', ->
        expect(@headers.put['Content-Type']).toEqual "application/json"
        expect(@headers.post['Content-Type']).toEqual "application/json"

  describe 'with routes', ->
    Controller1 = null
    beforeEach ->
      class Controller1
      
      class TestRouter extends Router
        routes: -> {
          default: "/dft"
          "/dft":
            template: "/template.html"
            controller: Controller1
        }
      scope = angular.scope()
      $browser = scope.$service '$browser'
      TestRouter.$inject = ['$route','$xhr']
   
      @router = scope.$new TestRouter

    it 'takes route info', ->
      expect(@router.$route.routes['/dft'].template).toEqual("/template.html")
      expect(@router.$route.routes['/dft'].controller).toEqual(Controller1)

    it 'has default route assignment', ->
      expect(@router.$route.routes["null"].redirectTo).toEqual("/dft")
