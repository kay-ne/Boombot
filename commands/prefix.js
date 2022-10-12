const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require("../botconfig.json");

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefix: botconfig.prefix
        }
    }
    let prefix = prefixes[message.guild.id].prefix;

    if(args[0] && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You cannot change the server prefix!");

    prefixes[message.guild.id] = {
        prefix: args[0]
    }

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if(err) console.log(err)
    });

    let embed = new Discord.MessageEmbed()
        .setColor('#5d97be')
        .setAuthor('Prefix Set!', 'https://imgur.com/xBzkgG0.png')
        .setDescription(`Set to **${args[0]}**`)
    message.channel.send(embed);
}

module.exports.help = {
    name: "prefix",
    aliases:[]
}