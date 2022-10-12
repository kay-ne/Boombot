const Discord = require('discord.js');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    const creator = "[discord username]";
    let servers = client.guilds.cache.size;
    const botVer = "v1.2.1";
    const lines = "~1,200+";
    const numComm = "27";
    const disVer = "v12.2.0";
    
    const botUptime = (`${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`);

    let string = (`**Creator: ** ${creator}\n**Servers: ** ${servers}\n**Creator: ** ${creator}\n**Bot Version: ** ${botVer}\n**Lines of Code: ** ${lines}`);
    let string2 = (`**Number of Commands: ** ${numComm}\n**Discord.js: ** ${disVer}\n**Uptime: ** ${botUptime}`);

    let embed = new Discord.MessageEmbed()
        .setColor('#5d97be')
        .setAuthor('Boombot Info', '[imgur link]')
        .setDescription(`${string}\n${string2}`)
    message.channel.send(embed);
}

module.exports.help = {
    name: "info",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}