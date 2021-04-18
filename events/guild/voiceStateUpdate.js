
module.exports = (Discord, client, oldState, newState) => {
  if(oldState.mute === newState.mute && client.miembros){
    let nombre = newState.member.displayName
    if(newState.channelID === client.canalID){
      client.miembros[nombre].push(Date.now())
    }
    if(oldState.channelID === client.canalID){
      client.miembros[nombre].push(Date.now())
    }
  }
}



