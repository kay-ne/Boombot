const Discord = require("discord.js");

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let helpEmbed = new Discord.MessageEmbed()
        .setColor('#5d97be')
        .setAuthor('Other Commands', 'https://imgur.com/xBzkgG0.png')
        .setDescription('__Wild Animals:__\n**bird**\n**cat**\n**dog**\n**fox**\n**pup**\n**shiba**\n\n__Fun/Helpful Commands:__\n**flip**\n-> flips a coin\n**8ball**\n-> 8ball <yes/no query>\n**tempconvert** [aka: temp]\n-> tempconvert <#>F/C/K\n\n__Misc:__\n**ping**\n-> returns ping\n**info**\n-> returns info about Boombot')
    message.channel.send(helpEmbed);
}

module.exports.help = {
    name: "other",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}