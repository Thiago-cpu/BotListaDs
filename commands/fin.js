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
    //calculando duración de la clase
    const duracionClase = Math.floor((Date.now() - client.inicio)/1000/60) 
    delete client.miembros[message.member.displayName]
    const miembrosOrdenados = Object.keys(client.miembros).sort()
    
    const Lista = new Discord.MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle(
    `Lista del curso: ${client.curso}\nDuración de la clase: ${duracionClase} minutos`)
    

    .setTimestamp()
    let descripcion = ''
    
    miembrosOrdenados.forEach(nombre => {  
      let presencia;
      if (client.miembros[nombre].length %2 ===1){
        client.miembros[nombre].push(Date.now())
      }
      if (client.miembros[nombre].length === 0){
        presencia = "ausente"
      }else{
        let minutosEnClase = this.obtenerMinutos(client.miembros[nombre]) 
        if(minutosEnClase === duracionClase){
          presencia = "presente"
        } else{
          presencia = `${minutosEnClase} minutos en clase`
        }
       
      }
    descripcion += `**${nombre}**: Estuvo ${presencia} \n`
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