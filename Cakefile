{exec} = require 'child_process'
console.log "bldin"
task 'build', 'Build project from app/src/*.coffee to app/js/*.js', ->
  for [output,input] in [["app/js/", "app/src/"],["test/unit","test/src"]]
    console.log output, input
    exec "coffee --compile --output #{output} #{input}", (err, stdout, stderr) ->
      if err
        exec "growlnotify -t 'Error' -m 'Compilation Error:#{err}'"
        throw err
      output = "#{stdout}#{stderr}"
      console.log output if output
