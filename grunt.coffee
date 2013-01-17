module.exports = (grunt)->
  console.log "GRUNT..."

  grunt.initConfig
    coffee:
      app:
        files:
          'test/unit/*.js': 'test/src/*.coffee'
          'app/js/*.js': 'app/src/*.coffee'


  grunt.loadNpmTasks 'grunt-contrib-coffee'

  grunt.registerTask "default", "coffee"
