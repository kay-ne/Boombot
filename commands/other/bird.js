const Discord = require("discord.js");
const animalAPI = require('random-animals-apis');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let msg = await message.channel.send("Generating...");

        const link = await animalAPI.getRandomBirdImage()

        if(!link) return message.channel.send("No bird arrived, you're not Snow White... try again!");

        let birdEmbed = new Discord.MessageEmbed()
            .setColor('#5d97be')
            .setTitle('A wild birdy appeared!')
            .setImage(`${link}`)
            .setTimestamp()

        message.channel.send(birdEmbed);
    msg.delete();
}

module.exports.help = {
    name: "bird",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}