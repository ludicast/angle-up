describe 'ApplicationRouter', ->
  class ApplicationRouter extends Router

  beforeEach ->
    scope = angular.scope()
    $browser = scope.$service '$browser'
    #$route = scope.$service '$route'
    #$xhr = scope.$service '$xhr'
    ApplicationRouter.$inject = ['$route','$xhr']
    myCtrl1 = scope.$new ApplicationRouter


  it 'should ....', ->
    

