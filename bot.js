const Discord = require('discord.js');
const client = new Discord.Client();
const embed = new Discord.RichEmbed();
const config = require('./config.json');
const FS = require('fs');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: '-',
  password: 'enter password here',
  database: 'enter database name here',
});

connection.connect();


client.on('ready', () => {
  console.log('Pass into the iris!');
});


client.on('guildCreate', function(guild){
  console.log("Bot trying to insert server" + guild.name + "into database");
  var sinfo= {
    "servername" : guild.name,
    "serverid" : guild.id,
    "ownerid" : guild.owner.id,
    "prefix" : config.prefix
  }
  connection.query("INSERT INTO servers SET?", sinfo, function(error){
      if(error){
        console.log(error);
      }
  })
})


client.on('message', message => {
  if (message.content.startsWith(config.prefix + 'ping')) {
    message.reply('Pong! <:Pandabot:315477477998985216> ! The response time is: `' + client.ping + 'ms`');
  }
  if (message.content === 'ethan?') {
	message.channel.send('SLAMMMMMMMMMMMMMMIIIIIIIIIINNNNN!');
  }
  if (message.content === 'becky?'|| message.content === 'Becky'|| message.content ==='Becky?'|| message.content ==='becky' ) {
	message.channel.send('*No Ron*');
	}
  if (message.content === 'sum fuk?') {
	message.channel.send('*No Ron*');
	}
  if (message.content === 'becky lemme smash') {
	message.channel.send('ffs Ron');
  }
  if (message.content.search("in queue")!= -1) {
    message.reply('Please use #shitposting to discuss queue numbers.')
    message.delete(1000);
    console.log("Deleted " + message.content + " from " + message.author);
  }
  if(message.content=== 'sinfo') {
    message.channel.sendMessage('The server name is' + message.guild.name );
  }
  if (message.content.startsWith(config.prefix + "prefix")){
    var tempprefix = message.content.split(' ').slice(1, 2);
    if ((tempprefix.length) > 2 ){
       message.channel.send('Please restrict the prefix to 2 characters.')
    
    }
    else{
      message.channel.send('Prefix changed from' + config.prefix + ' to ' + tempprefix);
      config.prefix = tempprefix;
      FS.writeFile('./config.json', JSON.stringify(config));
  }}
  var picture = 'https://cdn.discordapp.com/avatars/269206331347435521/26f7d9a35db0f483f183dc14026562d5.jpg?size=1024'
  var name = 'Panda'
  
   if (message.content.startsWith(config.prefix + "help")) {
    const embed = new Discord.RichEmbed()
      .setTitle('Papa Bless!')
      .setAuthor('Ethan Klein, at you service!', 'https://www.youtube.com/user/h3h3Productions')
      .setColor('#483D8B')
      .setDescription('Here\'s how you can use' + client.user.username)
      .setFooter('© ' + name, picture)
      .setThumbnail('https://media.giphy.com/media/WoXq3IHLd9BsY/giphy.gif')
      //Takes a Date object, defaults to current date.
      .setTimestamp(new Date())
      .setURL('https://www.youtube.com/user/h3h3Productions')
      .addField('All commands',
      '`!ping` :hand_splayed::skin-tone-3: Shows response time.\n\n`!help` Shows this message, displays all the commands.\n\n`!prefix`To change the prefix! eg: !prefix +, would make + your prefix')
    message.channel.sendEmbed(embed);
  };
    

 
})

client.login('put token here')