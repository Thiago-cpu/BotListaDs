
module.exports = (Discord, client, oldState, newState) => {
  const listasActuales = Object.keys(client.listas)
  if (newState.channelID != oldState.channelID && listasActuales.length){
    listasActuales.forEach((profesorId) =>{
      if(oldState.channelID === client.listas[profesorId].canalID ||
      newState.channelID === client.listas[profesorId].canalID){
        const lista = client.listas[profesorId] 
        let nombre = newState.member.displayName
        if(lista && lista.miembros[nombre]){
          const horaActual = new Date().toISOString().substr(11, 8)
          if (lista.miembros[nombre].length % 2 === 1){
            client.log(`${nombre} salió de ${lista.curso} a las ${horaActual}`)
          } else {
            client.log(`${nombre} entró a ${lista.curso} a las ${horaActual}`)
          }
          lista.miembros[nombre].push(Date.now())
        }
      }
    })
  }
}




