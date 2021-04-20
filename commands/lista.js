
module.exports = {
  name: 'lista',
  description: "Es un comando para empezar a tomar lista",
  execute(client, message, _args, _Discord){
    if (!message.member.voice.channel){
      return message.reply('Mira si voy a tomar lista cuando no estas en clase')
    }
    if(client.miembros){
      return message.reply('Bajen el volumen que no escucho los presentes')
    }
    if(!message.mentions.roles.size){
      return message.reply('¿En qué curso tomo lista?')
    }
    client.miembros = {}
    client.profesor = message.author
    const rolId = message.mentions.roles.first().id
    const canal = message.member.voice.channel
    client.canalID = canal.id
    console.log("rolId", rolId)
    message.guild.members.fetch()
    .then(miembros => {
      miembros.forEach(miembro =>{
        const nombre = miembro.displayName
        if(miembro._roles.includes(rolId)){
          client.miembros[nombre]=[]

        }
      })
      canal.members.forEach(member => {
        if(client.miembros[member.displayName]){
        const hora = Date.now()
        client.miembros[member.displayName] = [hora]
        }
      })
      console.log(client.miembros)
    })
    .catch(console.error)

    
    client.user.setActivity('los presentes', { type: 'LISTENING' })
    message.reply('Tomando lista...')
    
    console.log(client.miembros)
  },
}