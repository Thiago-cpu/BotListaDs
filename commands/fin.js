module.exports = {
  name: 'fin',
  description: "Es un comando para finalizar la lista previamente iniciada",
  execute(client,message,_args,Discord){
    console.log(`${message.member.displayName} usó el comando fin`)
    const profesor = message.member.id 
    if (!client.listas[profesor]){
      return message.reply('Todavía no tome listaaa')
    }
    
    
    message.reply('Enviando lista...')
    const lista = client.listas[message.member.id]
    //calculando duración de la clase
    const duracionClase = Math.floor((Date.now() - lista.inicio)/1000/60) 
    delete lista.miembros[message.member.displayName]
    const miembrosOrdenados = Object.keys(lista.miembros).sort()
    
    let Lista = new Discord.MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle(
    `Lista del curso: ${lista.curso}\nDuración de la clase: ${duracionClase} minutos`)
    

    
    let descripcion =''
    
    miembrosOrdenados.forEach((nombre) => {  
      let presencia;
      if (lista.miembros[nombre].length %2 ===1){
        lista.miembros[nombre].push(Date.now())
      }
      if (lista.miembros[nombre].length === 0){
        presencia = "ausente"
      }else{
        let minutosEnClase = this.obtenerMinutos(lista.miembros[nombre]) 
        if(minutosEnClase === duracionClase){
          presencia = "presente"
        } else{
          presencia = `${minutosEnClase} minutos en clase`
        }
      }
    const nuevoAlumno = `**${nombre}**: Estuvo ${presencia} \n`;
    if((nuevoAlumno.length + descripcion.length) > 2048) {
      Lista.setDescription(descripcion)
      lista.profesor.send(Lista)
      Lista = new Discord.MessageEmbed()
	    .setColor('#0099ff')
      descripcion = ''
    }
    descripcion += nuevoAlumno
    });
    Lista.setTimestamp()
    Lista.setDescription(descripcion)
    lista.profesor.send(Lista)

    delete client.listas[message.member.id]
    if (!(Object.keys(client.listas).length)){
      client.user.setActivity('quien ceba mejor mate', { type: 'COMPETING' })
    }
    console.log(`${message.member.displayName} pudo finalizar la lista correctamente`)
    console.log(lista)
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