const {prefix} = require('../config.json')
module.exports = {
  name: 'encuesta',
  description: "Permite realizar una encuesta binaria",
  execute(client, message, args, Discord){
    client.log(`${message.member.displayName} uso el comando help`)
    message.delete()
    const Encuesta = new Discord.MessageEmbed()
    .setColor('#0099ff')
	.setTitle('Encuesta')
    .setAuthor(message.member.displayName)
    Encuesta.setDescription(args.join(" "))
    message.channel.send(Encuesta).then(embedMessage => {
        embedMessage.react("👍");
        embedMessage.react("❓");
        embedMessage.react("👎");
    });
  }
}