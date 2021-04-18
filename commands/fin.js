module.exports = {
  name: 'fin',
  description: "Es un comando para finalizar la lista previamente iniciada",
  execute(client,message,args,Discord){
    if (!global.miembros){
      return message.reply('Todavía no tome listaaa')
    }
    if (!(global.profesor === message.author)){
      return message.reply('Vos no sos el dueño de la lista')
    }
    client.user.setActivity('quien ceba mejor mate', { type: 'COMPETING' })
    message.reply('Enviando lista...')
    const Tabla = new Discord.MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle('Lista')
  	.setAuthor('Para vos crack')
    .setTimestamp()
    const miembrosOrdenados = Object.keys(global.miembros).sort((a,b) => a.toLowerCase() < b.toLowerCase())
    miembrosOrdenados.map((key, index) => {  
      if (global.miembros[key].length %2 ===1){
        global.miembros[key].push(Date.now())
      }
      Tabla.addField(key,`${this.obtenerMinutos(global.miembros[key])} minutos en clase`, true)
    });
    global.profesor.send(Tabla)
    global.miembros = null
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