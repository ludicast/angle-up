describe 'Main Router', ->
  

  describe 'by default', ->
    beforeEach ->
      class TestRouter extends Router
  
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
    beforeEach ->
      class TestRouter extends Router
        routes: -> {
          default: "/dft"
        }

      scope = angular.scope()
      $browser = scope.$service '$browser'
      TestRouter.$inject = ['$route','$xhr']
   
      @router = scope.$new TestRouter
     
    it 'has default route assignment', ->
      expect(@router.$route.routes["null"].redirectTo).toEqual("/dft")
