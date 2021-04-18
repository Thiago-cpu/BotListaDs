const fs = require('fs')
const config = require('../config.json')
module.exports = {
  name: 'help',
  description: "Es un comando que te muestra los demas comandos",
  execute(client, message, args, Discord){
    const command_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
    let embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
	  .setTitle('help')
  	.setAuthor('Para vos crack')
    let respuesta = ''
    for (const file of command_files){
      const command = require(`../commands/${file}`)
      respuesta += `${config.prefix}${command.name} (${command.description}) \n`
    }
    embed.setDescription(respuesta)
    message.channel.send(embed)
  }

  
  
  
  
  }