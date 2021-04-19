module.exports = {
  name: 'fin',
  description: "Es un comando para finalizar la lista previamente iniciada",
  execute(client,message,_args,Discord){
    if (!client.miembros){
      return message.reply('Todavía no tome listaaa')
    }
    if (!(client.profesor === message.author)){
      return message.reply('Vos no sos el dueño de la lista')
    }
    client.user.setActivity('quien ceba mejor mate', { type: 'COMPETING' })
    message.reply('Enviando lista...')
    delete client.miembros[message.member.displayName]
    const miembrosOrdenados = Object.keys(client.miembros).sort()
    
    const Lista = new Discord.MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle(`Asistieron ${miembrosOrdenados.length} alumnos`)
    .setTimestamp()
    let descripcion = ''
    miembrosOrdenados.map(nombre => {  
      if (client.miembros[nombre].length %2 ===1){
        client.miembros[nombre].push(Date.now())
      }
      descripcion += `**${nombre}**: Estuvo ${this.obtenerMinutos(client.miembros[nombre])} minutos en clase \n`
    });
    Lista.setDescription(descripcion)
    client.profesor.send(Lista)
    client.miembros = null
  },
  obtenerMinutos(miembroTimes){
    let ms = 0;
    miembroTimes.forEach((value, index) => {
      if (index%2 === 0){
        ms -= value
      } else {
        ms += value
      }

    })
    return Math.floor(ms/1000/60)
  }
}