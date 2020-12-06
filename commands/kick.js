exports.run = (bot,message,args,ops) =>
{
	const member = message.mentions.members.first();
	if(member.id==='165083993945931776')
	{
		message.channel.send("https://imgur.com/a/p0Z0CUY");
		return;
	}
	if(message.author===bot.user)return;
	if(!member) return message.channel.send('Нема');
	if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send("нет прав");
	else
	{
		member.kick().then(()=>{
			message.channel.send("пока дурачок");
		}).catch(()=>
		{	
			message.channel.send("непон");
		});
	}
}	 