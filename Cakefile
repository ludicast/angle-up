{exec} = require 'child_process'
task 'build', 'Build project from app/src/*.coffee to app/js/*.js', ->
	for [output,input] in [["app/js/", "app/src/"],["test/unit","test/src"]]
  	exec "coffee --compile --output #{output} #{input}", (err, stdout, stderr) ->
    	throw err if err
    	console.log stdout + stderr
