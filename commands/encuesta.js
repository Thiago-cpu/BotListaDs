const {prefix} = require('../config.json')
module.exports = {
  name: 'encuesta',
  description: "Permite realizar una encuesta binaria.",
  example: ".encuesta(encuesta)",
  execute(client, message, args, Discord){
    const Encuesta = new Discord.MessageEmbed()
    .setColor('#0099ff')
	.setTitle('Encuesta')

    Encuesta.setDescription(args.join(" "))
    message.channel.send(Encuesta).then(embedMessage => {
        embedMessage.react("👍");
        embedMessage.react("❓");
        embedMessage.react("👎");
    });
  }
}