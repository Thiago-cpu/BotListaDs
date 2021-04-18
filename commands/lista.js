
module.exports = {
  name: 'lista',
  description: "Es un comando para empezar a tomar lista",
  execute(client, message, args, Discord){
    if (!message.member.voice.channel){
      return message.reply('Mira si voy a tomar lista cuando no estas en clase')
    }
    if(client.miembros){
      return message.reply('Bajen el volumen que no escucho los presentes')
    }
    client.miembros = {}
    client.user.setActivity('los presentes', { type: 'LISTENING' })
    message.reply('Tomando lista...')
    client.profesor = message.author
    let canal = message.member.voice.channel
    client.canalID = canal.id
    canal.members.forEach((member,_) => {
      let nombre = this.obtenerNombre(member)
      const hora = Date.now()
      client.miembros[nombre] = [hora]
    })
    console.log(client.miembros)
  },
  obtenerNombre(member){
    return member.nickname || member.user.username
  }
}