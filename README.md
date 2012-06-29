# UNDER CONSTRUCTION - DON'T USE UNTIL THIS MESSAGE IS GONE 

Once I add all support files and tests and set up the CS-to-JS pipeline we'll be good to go.  Till then, move on, this is not the library you're looking for.

Also, I am updating it to use 10.6 (after I learn all the new 10.6 goodness), so I just brought in the code from the newest angular-seed.

# angle-up - The HTML6 Shiv [![Build Status](https://secure.travis-ci.org/ludicast/angle-up.png)](http://travis-ci.org/ludicast/angle-up)

This project adds helpers for DRYing up your angularjs projects.  The eventual goal is to help you write even less code than angular normally makes you.  My inspiration is Jose Valim's [Inherited Resources](http://github.com/josevalim/inherited_resources) gem

## Assumptions

* Coffeescript - though there is a javascript file of the compiled Coffeescript, to edit or test the project (as well as read the docs), you need to know some coffeescript.  I will hopefully have a side-by side comparator in the docs letting people avoid need to know coffeescript to use the library.
* RESTful controllers where clintside models follow an equivalent naming convention.  This isn't a hard and fast rule, but I am trying to build this functionality out to reduce the clientside boilerplate needed. 
* Angular 0.10.6 - We are sticking to the "approved bleeding edge"
* JQuery is loaded somewhere in the asset pipeline.

### Installation

Just load the angle-up.js file after you load angular.

Or if you are using [angular-rails](http://github.com/ludicast/angular-rails) inside a Rails project, its generators will take care of adding angle-up.js to your asset pipeline.

## Helpers

The angle-up.js file contains some helper functions/objects/classes/services to clean things up.

### Router

There is a Router superclass for your main application router.  If you inherit from it in a coffeescript class 

    class @PhotoGalleryCtrl extends Router
      routes:->
        {
          default: '/photographers'
          '/photographers':
            template: "/templates/photographers.html"
            controller: PhotographersCtrl
          '/photographers/:photographer_id/galleries':
            template: "/templates/galleries.html"
            controller: GalleriesCtrl
          '/photographers/:photographer_id/galleries/:gallery_id/photos':
            template: "/templates/photos.html"
            controller: PhotosCtrl
        }

You will have those routes set up.  All this class needs is a member function called `routes` that returns a hash of routing information.

Note that this class will need to be injected with both the $xhr and the $route object like so:

    PhotoGalleryCtrl.$inject = ['$route', '$xhr']

This is because it sets us some CSRF preventions using $xhr as well (defaulting to Rails style, but any patches are welcome).  Note that this information gets thrown into the controller scope, so `@$xhr` and `@$router` are available in inheriting controllers as well (regardless if inheriting explicitly (through `extends`) or implictly (by being nested in a deeper view tag)).

Much of this is ripped from a demo by [Daniel Nelson](https://github.com/centresource/angularjs_rails_demo).

### resourceService

The `resourceService` function lets you create endpoints for RESTful requests.  This function has the following prototype:

    (serviceName, path, methods...)->

This sets up angular services for the listed path, supportitg whathever methods are listed.  It is called like:

    resourceService 'Photos', '/photos/:photo_id', 'index'
	
This creates for you an object `Photos` which may be accessed `@photos = Photos.index()`.  So far the accepted actions are 'index', 'update', 'create' and 'destroy'.  If you leave off all actions, it will automatically assume that you want to support all 4.  So if you call the function

    resourceService 'SelectedPhotos', '/selected_photos/:selected_photo_id'
     
It will create all the necessary endpoints for you.  

### autowrap

An `autowrap` function added to global namespace.  This function takes a class to wrap the resource result in and optionally takes a function to pass it in to (e.g. if you need a function to alert the result).  This function is passed in as the success function like so:

		@todo_list = TodoListService.get {id:id}, autowrap(TodoList)

`autowrap` attempts to cast the prototype of the returned object to the class type.  It also calls an initalize function if it exists.  This way, if your object has a little richness to it, the initialize function can fire off some changes.  This bring us to...

### AngularModel

All classes that inherit from AngularModer may be used to wrap the results returned from angular.  They also allow you to map hasMany associations like so (haven't needed belongsTo yet myself):

		class @Todo extends AngularModel
			schedule:(procrastinationTime)-> # postpone to future 

		class @TodoList extends AngularModel
			hasMany:
				todos: Todo

Basically, when `initialize` is called on an instance of `AngularModel` it recursively calls `initialize` (if it exists) on any subobjects found in the hasMany wrapping.

### eventuallyWork Service

I added an `eventuallyWork` service.  Basically if you call it with a function as its parameter it will keep running the function until it doesn't throw an exception.  This is mostly useful for cases where you have an inner view that has values based on what is set in its outer view.  When that view is visited via a bookmark there might not be time for the outer view to initialize.   It can be run like this (notice the "fat" arrow):

    eventuallyWork =>
      for student in this.classroom.students
        if student.id = $routeParams.student_id
          this.reportCard = student.report_card
