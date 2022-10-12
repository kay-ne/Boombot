module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    const m = await message.channel.send("Ping?");
    //var ping = m.createdTimestamp - m.createdTimestamp;
    m.edit(`**Pong!**\n${m.createdTimestamp - message.createdTimestamp}ms`)
}

module.exports.help = {
    name: "ping",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}