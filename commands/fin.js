module.exports = {
  name: 'fin',
  description: "Es un comando para finalizar la lista previamente iniciada",
  execute(client,message,args,Discord){
    if (!client.miembros){
      return message.reply('Todavía no tome listaaa')
    }
    if (!(client.profesor === message.author)){
      return message.reply('Vos no sos el dueño de la lista')
    }
    client.user.setActivity('quien ceba mejor mate', { type: 'COMPETING' })
    message.reply('Enviando lista...')
    const Tabla = new Discord.MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle('Lista')
  	.setAuthor('Para vos crack')
    .setTimestamp()
    const miembrosOrdenados = Object.keys(client.miembros).sort()
    console.log(miembrosOrdenados)
    miembrosOrdenados.map((key, index) => {  
      if (client.miembros[key].length %2 ===1){
        client.miembros[key].push(Date.now())
      }
      Tabla.addField(key,`${this.obtenerMinutos(client.miembros[key])} minutos en clase`, true)
    });
    client.profesor.send(Tabla)
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