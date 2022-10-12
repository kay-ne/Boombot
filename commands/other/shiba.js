const Discord = require("discord.js");
const animalAPI = require('random-animals-apis');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let msg = await message.channel.send("Generating...");

        const link = await animalAPI.getRandomShibaInuImage()

        if(!link) return message.channel.send("No shiba appeared! ;-; Please try again!");

        let shibaEmbed = new Discord.MessageEmbed()
            .setColor('#5d97be')
            .setTitle('A wild Shiba Inu appeared!')
            .setImage(`${link}`)
            .setTimestamp()

        message.channel.send(shibaEmbed);
    msg.delete();
}

module.exports.help = {
    name: "shiba",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}