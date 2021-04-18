let {obtenerNombre} = require('../../commands/lista.js')

module.exports = (Discord, client, oldState, newState) => {
  if(oldState.mute === newState.mute && global.miembros){
    let nombre = obtenerNombre(newState.member)
    if(newState.channelID === global.canalID){
      global.miembros[nombre].push(Date.now())
    }
    if(oldState.channelID === global.canalID){
      global.miembros[nombre].push(Date.now())
    }
  }
}



