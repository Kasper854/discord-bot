const botSets = require("./config.json");
const Discord = require("discord.js");
var request = require('superagent');
const prefix = botSets.prefix;
let servers = {};
const bot = new Discord.Client({disableEveryone:true});
const active = new Map();

bot.on("ready",async ()=>{
	console.log(`Bot is ready! ${bot.user.username}`);
	bot.user.setActivity("prefix: _");
	try{
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	}
	catch(e)
	{
		console.log(e);
	}
});

bot.on('guildMemberAdd', async member => {
	//message.guild.roles.cache.find
		let channel = member.guild.channels.cache.find(ch => ch.name ==="general");
		channel.send(`Подъехал новый  ${member}`);
		let firstRole = member.guild.roles.cache.find(role =>role.name==="Будкожители");
		if(!firstRole)
		{
				firstRole = await member.guild.roles.create({
					data :
					{
						name : "Будкожители",
						color : "#d33d55",
					},
				}).then(console.log)
				.catch(console.error);
		}
		member.roles.add(firstRole);
});

bot.on("message", async message =>{
	if(message.author.bot) return;
	if(message.channel.type ==="dm") return;

	let args = message.content.slice(prefix.length).trim().split(' ');
	let cmd = args.shift().toLowerCase();

	if(!message.content.startsWith(prefix)) return;
	try {
		//delete require.cache[require.resolve(`./commands/${cmd}.js`)];
		var ops={
			activeQ:active,
		}
		let commandFile = require(`./commands/${cmd}.js`);
		commandFile.run(bot,message,args,ops);
	} catch(e) {
		console.log(e.stack)
	}

   
});

bot.login(botSets.token);