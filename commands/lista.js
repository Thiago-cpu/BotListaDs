
const {profesores} = require('../config.json')
module.exports = {
  name: 'lista',
  description: "Es un comando para empezar a tomar lista",
  execute(client, message, _args, _Discord){
    console.log(`${message.member.displayName} uso el comando lista`)
    if (!profesores.includes(message.member.id)){
      console.error(`${message.member.displayName} no era profesor.`)
      return message.reply('No sos el profesor')
    }
    const profesorID = message.member.id
    
    if (!message.member.voice.channel){
      console.error(`${message.member.displayName} no estaba en un canal.`)
      return message.reply('Mira si voy a tomar lista cuando no estas en clase')
    }
    if(client.listas[profesorID]){
      console.error(`${message.member.displayName} ya estaba tomando lista.`)
      return message.reply(`Todavía estoy tomando lista en ${client.listas[profesorID].curso} `)
    }
    if(!message.mentions.roles.size){
      console.error(`${message.member.displayName} no especificó curso.`)
      return message.reply('¿En qué curso tomo lista?')
    }
    client.listas[profesorID] = {}
    const lista = client.listas[profesorID]
    lista.miembros = {}
    lista.inicio = Date.now()
    lista.profesor = message.author
    const rolId = message.mentions.roles.first().id
    lista.curso = message.mentions.roles.first().name
    console.log(`Tomando lista en ${lista.curso}`)
    const canal = message.member.voice.channel
    lista.canalID = message.member.voice.channelID
    message.guild.members.fetch()
    .then(miembros => {
      miembros.forEach(miembro =>{
        const nombre = miembro.displayName
        if(miembro._roles.includes(rolId)){
          lista.miembros[nombre]=[]

        }
      })
      canal.members.forEach(member => {
        if(lista.miembros[member.displayName]){
        const hora = Date.now()
        lista.miembros[member.displayName] = [hora]
        }
      })
    })
    .catch(console.error)

    
    client.user.setActivity('los presentes', { type: 'LISTENING' })
    message.reply('Tomando lista...')
  },
}