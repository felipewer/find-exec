var exec = require('child_process').execSync
// var exec = require('sync-exec')
var platform = require('os').platform()

module.exports = function(){
  var commands = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.apply(arguments)
  var command = null

  commands.some(function(c){
    if (exec(findCommand(c)).status === 0){
      command = c
      return true
    }
  })

  return command
}

function findCommand(command){
  if (/^win/.test(platform)) {
    return "where " + command
  } else {
    return "command -v " + command + " >/dev/null 2>&1"
  }
}
