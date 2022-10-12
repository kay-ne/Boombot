const Discord = require("discord.js");
const animalAPI = require('random-animals-apis');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let msg = await message.channel.send("Generating...");

    const link = await animalAPI.getRandomDogImage()

    if(!link) return message.channel.send("No doggo appeard, sorry! Please try again!");

    let dogEmbed = new Discord.MessageEmbed()
        .setColor('#5d97be')
        .setTitle('A wild doggo appeared!')
        .setImage(`${link}`)
        .setTimestamp()

    message.channel.send(dogEmbed);
    msg.delete();
}

module.exports.help = {
    name: "dog",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}