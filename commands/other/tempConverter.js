const Discord = require ('discord.js');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let convert = args[0];

    if(Number(convert.substring(0, convert.length-1)))
    {
        let number = convert.substring(0, convert.length-1);
        //C -> F
        if(convert.charAt(convert.length-1) === "c" || convert.charAt(convert.length-1) === "C")
        {
            let fahrenheit = (((number * 9) / 5) + 32);
            let kelvin = (parseInt(number) + 273.15);
            let tempEmbed = new Discord.MessageEmbed()
                .setColor('#5d97be')
                .setDescription(`**${number}°C** -> **${fahrenheit.toFixed(2)}°F** and **${kelvin.toFixed(2)}°K**`);
            message.channel.send(tempEmbed);
            return;
        }
        //F -> C
        if(convert.charAt(convert.length-1) === "f" || convert.charAt(convert.length) === "F")
        {
            let celsius = (((number - 32) * 5) / 9);
            let kelvin = ((((number - 32) * 5) / 9) + 273.15);
            let tempEmbed = new Discord.MessageEmbed()
                .setColor('#5d97be')
                .setDescription(`**${number}°F** -> **${celsius.toFixed(2)}°C** and **${kelvin.toFixed(2)}°K**`)
            message.channel.send(tempEmbed);
            return;
        }
        //K -> F + C
        if(convert.charAt(convert.length-1) === "k" || convert.charAt(convert.length) === "K")
        {
            let fahrenheit = ((((number - 273.15) * 9) / 5) + 32);
            let celsius = (number - 273.15);
            let tempEmbed = new Discord.MessageEmbed()
                .setColor('#5d97be')
                .setDescription(`**${number}°K** -> **${fahrenheit.toFixed(2)}°F** and **${celsius.toFixed(2)}°C**`)
            message.channel.send(tempEmbed);
            return;
        }
        else
        {
            let errorE = new Discord.MessageEmbed()
                .setColor('#5d97be')
                .setDescription("**You have to provide a unit of `F` or `C` after the number!**\n`tempconvert <#>F/C/K`")
            message.channel.send(errorE);
            return;
        }
    }
    else
    {
        let NaNEmbed = new Discord.MessageEmbed()
                .setColor('#5d97be')
                .setDescription("**Input not valid!**\n`tempconvert <#>F/C`")
            message.channel.send(NaNEmbed);
        return;
    }
}

module.exports.help = {
    name: "tempconvert",
    aliases:["temp"] //to add more aliases separate with commas ex: "p", "pin"
}