const Discord = require("discord.js");

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let msg = await message.channel.send("Flipping coin...");
    let coin = ['**Heads!**', '**Tails!**'];

    let coinIndex = Math.round(Math.random()*coin.length);
    var choice = coin[coinIndex];

    if(!choice)
    {
        message.channel.send("The coin dropped and went missing! Flip another coin!");
        msg.delete();
    }
    else
    {
        let coinEmbed = new Discord.MessageEmbed()
            .setColor('#5d97be')
            .setTitle(`${choice}`)
            .setTimestamp()
        message.channel.send(coinEmbed);
        msg.delete();
    }
}

module.exports.help = {
    name: "flip",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}