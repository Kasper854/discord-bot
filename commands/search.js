const search = require('yt-search');

exports.run = (bot,message,args,ops)=>
{
	
	search(args.join(' '),function(err,res)
	{
		
			if(err)message.channel.send('Ошибка');
			let videos = res.videos.slice(0,10);
			let resp ='';
			for(var video in videos)
			{
				resp +=`**[${parseInt(video)+1}]: ** ${videos[video].title}\n`;
			}
			resp+=`\n**Выберите между** 1 - ${videos.length}`;
   			message.channel.send(resp);
			const filter = m=> !isNaN(m.content)&&m.content<videos.length+1&&m.content>0;

			const collector  = message.channel.createMessageCollector(filter);

			collector.videos = videos;
			try{
				collector.once('collect',function(m)
				{
					let commandFile = require(`./play.js`)
					commandFile.run(bot,message,[this.videos[parseInt(m.content)-1].url],ops);
				})
			}
			catch(e){
				message.channel.send("Ошибка");
			}
			
	});
	
}