const Discord = require("discord.js");
const animalAPI = require('random-animals-apis');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let msg = await message.channel.send("Generating...");

        const link = await animalAPI.getRandomFoxImage()

        if(!link) return message.channel.send("No fox appeared! :( Please try again!");

        let foxEmbed = new Discord.MessageEmbed()
            .setColor('#5d97be')
            .setTitle('A wild fox appeared!')
            .setImage(`${link}`)
            .setTimestamp()

        message.channel.send(foxEmbed);
    msg.delete();
}

module.exports.help = {
    name: "fox",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}