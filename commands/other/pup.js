const Discord = require("discord.js");
const randomPuppy = require('random-puppy'); //random puppy

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let msg = await message.channel.send("Generating...");

        randomPuppy().then(url => {
            //console.log(url);
            if(!url) return message.channel.send("No pupper appeared! Maybe it's sleeping? Please try again!");
            
            let pupEmbed = new Discord.MessageEmbed()
                .setColor('#5d97be')
                .setTitle('A wild pupper appeared!')
                .setImage(`${url}`)
                .setTimestamp()

            message.channel.send(pupEmbed);
            
            })

        msg.delete();
}

module.exports.help = {
    name: "pup",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}