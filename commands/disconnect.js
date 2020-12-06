exports.run = (bot,message,args,ops)=>
{
    if(!message.member.voice.channel)return;
    if(!message.guild.voice.channel)return;
    message.guild.me.voice.channel.leave();
}