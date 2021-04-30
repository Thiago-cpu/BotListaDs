
module.exports = (Discord, client, oldState, newState) => {
  if (newState.channelID != oldState.channelID && client.listas.length){
    const listasActuales = Object.keys(client.listas)
    listasActuales.forEach((profesorId) =>{
      if(oldState.channelID === client.listas[profesorId].canalID ||
      newState.channelID === client.listas[profesorId].canalID){
        const lista = client.listas[profesorId] 
      }
    })
    let nombre = newState.member.displayName
    if(lista && lista.miembros[nombre]){
      lista.miembros[nombre].push(Date.now())
    }
  }
}




