
module.exports = {
  name: 'lista',
  description: "Es un comando para empezar a tomar lista",
  execute(client, message, args, Discord){
    if (!message.member.voice.channel){
      return message.reply('Mira si voy a tomar lista cuando no estas en clase')
    }
    if(global.miembros){
      return message.reply('ya estoy tomando lista pelotu2')
    }
    global.miembros = {}
    client.user.setActivity('los presentes', { type: 'LISTENING' })
    message.reply('Tomando lista...')
    global.profesor = message.author
    let canal = message.member.voice.channel
    global.canalID = canal.id
    canal.members.forEach((member,_) => {
      let nombre = this.obtenerNombre(member)
      const hora = Date.now()
      global.miembros[nombre] = [hora]
    })
    console.log(global.miembros)
  },
  obtenerNombre(member){
    return member.nickname || member.user.username
  }
}