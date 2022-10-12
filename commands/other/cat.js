const Discord = require("discord.js");
const animalAPI = require('random-animals-apis');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let msg = await message.channel.send("Generating...");

        const link = await animalAPI.getRandomCatImage()

        if(!link) return message.channel.send("No cat appeared... please try again! Hint: Use catnip!");

        let catEmbed = new Discord.MessageEmbed()
            .setColor('#5d97be')
            .setTitle('A wild cat appeared!')
            .setImage(`${link}`)
            .setTimestamp()

        message.channel.send(catEmbed);
    msg.delete();
}

module.exports.help = {
    name: "cat",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}