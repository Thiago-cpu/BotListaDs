const {prefix} = require('../config.json')
module.exports = {
  name: 'help',
  description: "Es un comando que te muestra los demas comandos",
  execute({commands }, message, _args, Discord){
    client.log(`${message.member.displayName} usó el comando help`)
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
	  .setTitle('help')
    let respuesta = ''
    commands.forEach(({name, description}) => {
      respuesta += `${prefix}${name} (${description}) \n`
    })

    embed.setDescription(respuesta)
    message.channel.send(embed)
  }
}