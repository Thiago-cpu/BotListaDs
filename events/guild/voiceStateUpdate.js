let {obtenerNombre} = require('../../commands/lista.js')

module.exports = (Discord, client, oldState, newState) => {
  if(oldState.mute === newState.mute && client.miembros){
    let nombre = obtenerNombre(newState.member)
    if(newState.channelID === client.canalID){
      client.miembros[nombre].push(Date.now())
    }
    if(oldState.channelID === client.canalID){
      client.miembros[nombre].push(Date.now())
    }
  }
}



