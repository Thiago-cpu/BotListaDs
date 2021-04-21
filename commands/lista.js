
module.exports = {
  name: 'lista',
  description: "Es un comando para empezar a tomar lista",
  execute(client, message, _args, _Discord){
    if (!(message.member.id === '617530490869645313')){
      return message.reply('No sos el profesor')
    }
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
    client.inicio = Date.now()
    client.profesor = message.author
    const rolId = message.mentions.roles.first().id
    client.curso = message.mentions.roles.first().name
    const canal = message.member.voice.channel
    client.canalID = canal.id
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
    })
    .catch(console.error)

    
    client.user.setActivity('los presentes', { type: 'LISTENING' })
    message.reply('Tomando lista...')
  },
}