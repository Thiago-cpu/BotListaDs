module.exports = (Discord, client) =>{
client.setMaxListeners (200)
console.log(`Inciado Como: ${client.user.tag}`);
client.user.setPresence( {
  
activity: {name: `quien ceba mejor mate`,
type: "COMPETING"},
status:"online"});
}