class AbstractRouter
  initRoutes:(routes)->
    for routeName, info of routes
      if routeName is "default"
        @$route.otherwise redirectTo: info
      else
        @$route.when routeName,
          template: info.template
          controller: info.controller
    @$route.parent @

  setupXhr:->
    @$xhr.defaults.headers.post['Content-Type'] = 'application/json'
    @$xhr.defaults.headers.put['Content-Type'] = 'application/json'

  constructor:(@$route, @$xhr)->
    @setupXhr()
    @initRoutes @routes?()

class @RailsRouter extends AbstractRouter
   setupXHR: ->
    super()
    if token = $("meta[name='csrf-token']").attr("content")
      @$xhr.defaults.headers.post['X-CSRF-Token'] = token
      @$xhr.defaults.headers.put['X-CSRF-Token'] = token
      @$xhr.defaults.headers['delete']['X-CSRF-Token'] = token


@resourceService = (serviceName, path, methods...)->
	if methods.length is 0
		methods.push 'index', 'create', 'update', 'destroy', 'show'
	commandHash = {}
	for type in methods
		commandHash[type] = switch type
			when 'index'
				{ method:'GET', isArray:true }
			when 'show'
				{ method:'GET', isArray:false }
			when 'create'
				{ method: 'POST' }
			when 'update'
				{ method: 'PUT' }
			when 'destroy'
				{ method: 'DELETE' }
	
	angular.service serviceName, ($resource)->
		$resource path, {}, commandHash

angular.element(document).ready ->
	angular.compile(document)().$apply()

class @AngularModel
	initialize:->
		if @hasMany
			for name, clazz of @hasMany
        @[name] or= []
				for obj in @[name]
					obj.__proto__ = new clazz()
					obj.initialize?()

angular.service "eventuallyWork", (($defer)->
  eventuallyWork = (func, timeout)->
    try
      func()
    catch e
      $defer (-> eventuallyWork func, 2*timeout), timeout
  (func)->
    eventuallyWork(func, 10)
), {$inject: ['$defer']}

@autowrap = (clazz, callback)->
	(result)->
		result.__proto__ = new clazz()
		result.initialize?()
		if callback
			callback(result)
