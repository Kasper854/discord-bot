exports.run = async (bot,message,args,ops)=>
{
    let fetched = ops.activeQ.get(message.guild.id);
    console.log(fetched);
    if(!fetched) return message.channel.send("Нет песен");
    if(message.member.voice.channel!==message.guild.me.voice.channel) return ("Ты где");

      
    return fetched.connection.dispatcher.end();
}