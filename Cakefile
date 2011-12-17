{exec} = require 'child_process'
task 'build', 'Build project from app/src/*.coffee to lib/*.js', ->
  exec 'coffee --compile --output lib/ app/src/', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

