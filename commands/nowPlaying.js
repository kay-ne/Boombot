const Discord = require ('discord.js');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!serverQueue || !serverQueue.songs[0])
    {
        return message.channel.send("❌ **There is no song to see!**");
    }
    else
    if(serverQueue.songs[0].duration > -1 && serverQueue.songs[0].duration < 1)
    {
        let nowPlayEmbed = new Discord.MessageEmbed()
            .setColor('#5cbeff')
            .setAuthor('Now Playing', 'https://imgur.com/xBzkgG0.png')
            .setThumbnail(`https://i.ytimg.com/vi/${serverQueue.songs[0].thumbnail}/maxresdefault.jpg`)
            .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})\n\n**Channel: ** ${serverQueue.songs[0].channel}\n**Duration: ** LIVE\n**Requested By: ** ${serverQueue.songs[0].requester}`)
        return message.channel.send(nowPlayEmbed);
    }
    if(serverQueue.songs[0].duration > 0)
    {
        //current duration milliseconds to seconds and time
        let end = Date.now();
        let substract = parseInt(end) - parseInt(serverQueue.start);

        let seconds = parseInt(substract / 1000);
        let nowHours = parseInt(seconds / 3600);
        let nowRemainder = seconds - nowHours * 3600;
        let nowMins = parseInt((nowRemainder) / 60);
        nowRemainder = nowRemainder - nowMins * 60;
        let nowSecs = nowRemainder;

        if(nowSecs < 10)
        {
            nowSecs = (`0${nowSecs}`);
        }
        if(nowMins < 10)
        {
            nowMins = (`0${nowMins}`);
        }
        if(nowHours > 0 && nowHours < 10)
        {
            nowHours = (`0${nowHours}`);
        }
        if(nowHours < 1)
        {
            nowHours = (" ");
        }

        let nowTime = {nowHours, nowMins, nowSecs};

        //seconds to normal time
        let time = serverQueue.songs[0].duration;
        let hours = parseInt(time / 3600);
        let remainder = time - hours * 3600;
        let mins = parseInt((remainder) / 60);
        remainder = remainder - mins * 60;
        let secs = remainder;

        if(hours > 0 && hours < 10)
        {
            hours = (`0${hours}`);
        }
        if(hours < 1)
        {
            hours = (" ");
        }
        if(mins < 10)
        {
            mins = (`0${mins}`);
        }
        if(secs < 10)
        {
            secs = (`0${secs}`);
        }

        let times = {hours, mins, secs};
        
        if(nowTime.nowHours !== " ")
        {
            let nowPlayEmbed = new Discord.MessageEmbed()
                .setColor('#5cbeff')
                .setAuthor('Now Playing', 'https://imgur.com/xBzkgG0.png')
                .setThumbnail(`https://i.ytimg.com/vi/${serverQueue.songs[0].thumbnail}/maxresdefault.jpg`)
                .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})\n\n**Channel: ** ${serverQueue.songs[0].channel}\n**Duration: ** ${nowTime.nowHours}:${nowTime.nowMins}:${nowTime.nowSecs}/${times.hours}:${times.mins}:${times.secs}\n**Requested By: ** ${serverQueue.songs[0].requester}`)
            return message.channel.send(nowPlayEmbed);
        }
        else
        if(nowTime.nowHours === " " && times.hours !== " ")
        {
            let nowPlayEmbed = new Discord.MessageEmbed()
                .setColor('#5cbeff')
                .setAuthor('Now Playing', 'https://imgur.com/xBzkgG0.png')
                .setThumbnail(`https://i.ytimg.com/vi/${serverQueue.songs[0].thumbnail}/maxresdefault.jpg`)
                .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})\n\n**Channel: ** ${serverQueue.songs[0].channel}\n**Duration: ** ${nowTime.nowMins}:${nowTime.nowSecs}/${times.hours}:${times.mins}:${times.secs}\n**Requested By: ** ${serverQueue.songs[0].requester}`)
            return message.channel.send(nowPlayEmbed);
        }
        else
        if(nowTime.nowHours === " " && times.hours === " ")
        {
            let nowPlayEmbed = new Discord.MessageEmbed()
                .setColor('#5cbeff')
                .setAuthor('Now Playing', 'https://imgur.com/xBzkgG0.png')
                .setThumbnail(`https://i.ytimg.com/vi/${serverQueue.songs[0].thumbnail}/maxresdefault.jpg`)
                .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})\n\n**Channel: ** ${serverQueue.songs[0].channel}\n**Duration: ** ${nowTime.nowMins}:${nowTime.nowSecs}/${times.mins}:${times.secs}\n**Requested By: ** ${serverQueue.songs[0].requester}`)
            return message.channel.send(nowPlayEmbed);
        }
    }
}

module.exports.help = {
    name: "now playing",
    aliases:["np", "now"] //to add more aliases separate with commas ex: "p", "pin"
}