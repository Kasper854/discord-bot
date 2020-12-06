const Discord = require("discord.js");
exports.run = (bot,message,args,ops)=>
{
	let userEmbed = message.mentions.users.first();
		let embed = new Discord.MessageEmbed()
		if(userEmbed)
		{
			myEmbed(embed,userEmbed);
		}	
		else
		{
			myEmbed(embed,message.author);
		
		}
		return message.channel.send(embed);
}
function myEmbed (embed,user)
{
	embed.setColor('RANDOM')
	.setTitle('Userinfo')
	.setAuthor(user.username)
	.setDescription(`User ID is ${user.discriminator}`)
	.addField('Created at', user.createdAt, true)
	.setTimestamp()
	.setThumbnail(user.displayAvatarURL())	
	return embed;
}
