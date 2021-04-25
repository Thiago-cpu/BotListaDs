
module.exports = (Discord, client, oldState, newState) => {
  let nombre = newState.member.displayName
  if(oldState.mute === newState.mute && client.miembros && client.miembros[nombre]){
    if(newState.channelID === client.canalID || oldState.channelID ===client.canalID){
      client.miembros[nombre].push(Date.now())
    }
  }
}



