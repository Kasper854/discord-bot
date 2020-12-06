const ytdl = require('ytdl-core');
exports.run = async (bot,message,args,ops)=>
{
	if(!message.member.voice.channel)return message.channel.send('Зайди в канал.');

	if(message.guild.me.voiceChannel) return message.channel.send('Я уже тут.');

	let validate = await ytdl.validateURL(args[0]);
	if(!validate)
	{	
		let commandFile = require(`./search.js`);
		return commandFile.run(bot,message,args,ops);
	}
	let serverQueue=ops.activeQ.get(message.guild.id);
	let info = await ytdl.getInfo(args[0]);
	const song = {
		title: info.videoDetails.title,
		url: info.videoDetails.video_url,
	};	
	if (!serverQueue) {
		const queueContruct = {
		    textChannel: message.channel,
		    voiceChannel: message.member.voice.channel,
		    connection: null,
		    songs: [],
		    volume: 5,
		    playing: true
		    };
		
			ops.activeQ.set(message.guild.id, queueContruct);
		
		    queueContruct.songs.push(song);
		
		    try
		    {
		      var connection = await message.member.voice.channel.join();
		      queueContruct.connection = connection;
		      play(message.guild, queueContruct.songs[0]);
		    } catch (err)
		    {
		      console.log(err);
			  ops.activeQ.delete(message.guild.id);
		      return message.channel.send(err);
		    }
		  	}
		  	else {
		    serverQueue.songs.push(song);
			return message.channel.send(`${song.title} добавлено в очередь`);
			}
}
function play(guild, song) {
	const serverQueue = ops.activeQ.get(guild.id)
	if (!song) {
	  serverQueue.voiceChannel.leave();
	  ops.activeQ.delete(guild.id);
	  return;
   }
  
	const dispatcher = serverQueue.connection
	  .play(ytdl(song.url))
	  .on("finish", () => {
		serverQueue.songs.shift();
		play(guild, serverQueue.songs[0]);
	  })
	  .on("error", error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	serverQueue.textChannel.send(`Сейчас играет: **${song.title}**`);
}
