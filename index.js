const express = require('express');
const app = express();
const port = 3000;
app.get("/", function (request, response) {
response.sendFile(__dirname + '/Pagina.html');});
app.listen(port, () => console.log(`Todo bien, todo correcto :D`));
const { Client, MessageEmbed  } = require("discord.js");
const client = new Client();
const config = require('./config.json');
const comillas = "_"
let miembros;
let update;
let Profesor;

client.on('ready', () => {
console.log(`Inciado Como: ${client.user.tag}`);
client.user.setPresence( {
  
activity: {name: `quien ceba mejor mate`,
type: "COMPETING"},
status:"online"});})
client.setMaxListeners (200)


client.on('message', msg => {

  if (msg.author == client.user){return}
  let message = msg.content.toLowerCase()
  if(message.startsWith(`${config.prefix}lista`)) {
    if (!msg.member.voice.channel){
      return msg.reply('Mira si voy a tomar lista cuando no estas en clase')
    }
    if(miembros){
      return msg.reply('ya estoy tomando lista pelotu2')
    }
    client.user.setActivity('los presentes', { type: 'LISTENING' })
    update = true;
    miembros = {}
    msg.reply('Tomando lista...')
    Profesor = msg.author
    const canal = msg.member.voice.channel
    let canalID = canal.id
    canal.members.forEach((member,_) => {
      let nombre = obtenerNombre(member)
      const hora = Date.now()
      miembros[nombre] = [hora]
    })
    console.log(miembros)
    client.on('voiceStateUpdate', (oldState, newState) => {
    
      if(oldState.mute === newState.mute && update === true){
        let nombre = obtenerNombre(newState.member)
        if(newState.channelID === canalID){
          miembros[nombre].push(Date.now())
        }
        if(oldState.channelID === canalID){
          //sefue
          miembros[nombre].push(Date.now())
        }

      }
    })
  }
  if(message.startsWith(`${config.prefix}fin`)) {
    if (!miembros){
      return msg.reply('Todavía no tome listaaa')
    }
    client.user.setActivity('quien ceba mejor mate', { type: 'COMPETING' })
    update = false;
    msg.reply('Enviando lista...')
    const Tabla = new MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle('Lista')
  	.setAuthor('Para vos crack')
    .setTimestamp()
    const miembrosOrdenados = Object.keys(miembros).sort((a,b) => a.toLowerCase() < b.toLowerCase())
    miembrosOrdenados.map(function(key, index) {
    if (miembros[key].length %2 ===1){
      miembros[key].push(Date.now())
    }
    Tabla.addField(key,`${ObtenerMinutos(miembros[key])} minutos en clase`, true)
  });
    Profesor.send(Tabla)
    miembros = null
  }
  });
function obtenerNombre(member){
  return member.nickname || member.user.username
}
function ObtenerMinutos(miembroTimes){
  let ms = 0;
  
  miembroTimes.forEach((value, index) => {
    console.log(value)
    if (index%2 === 0){

      ms -= value
    } else {
      ms += value
    }

  })
  return Math.floor(ms/1000/60)
 

}
// function obtenerHora(){
//   let hoy = new Date()
//   const h = hoy.setHours(hoy.getHours() - 3); 
//   let hora = `${h}:${hoy.getMinutes()}:${hoy.getSeconds()}`
//   return hoy
// }
client.login(config.token);