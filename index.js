const express = require('express');
const app = express();
const port = 3000;
app.get("/", function (request, response) {
response.sendFile(__dirname + '/Pagina.html');});
app.listen(port, () => console.log(`Todo bien, todo correcto :D`));
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');





client.commands = new Discord.Collection()
client.events = new Discord.Collection()
const handlers = ['command_handler', 'event_handler']

handlers.forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord)
})

client.login(config.token);