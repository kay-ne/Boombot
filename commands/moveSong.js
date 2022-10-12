module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
    {
        return message.channel.send(
            "❌ **You need to be in a voice channel to move songs in queue!**"
        );
    }
    if(serverQueue && message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to move songs in queue!**"
        );
    }
    if(!serverQueue)
    {
        return message.channel.send(
            "❌ **There are no songs in queue to move!**"
        );
    }
    else
    if(!args[0]) //no numbers
    {
        message.channel.send("❌ **You must provide the song number you want to move to the top of the queue!**\n-> **Format:** `bb.move <current>`");
    }
    else
    if(args[0] > serverQueue.songs.length-1) //server.songs.length included current song so -1 to not "include" it
    {
        return message.channel.send(
            "❌ **There are no song at that number!**"
        );
    }
    else
    if(args[0] < 1 && args[0] > -1) // 0 is current song
    {
        return message.channel.send(
            "❌ **You can't move a song that is currently playing!**"
        );
    }
    else
    if(args[0] > 0 && args[0] < 2) // next song/at the top of queue
    {
        return message.channel.send(
            "❌ **You can't move a song that is already at the top of the queue!**"
        );
    }
    else
    if(args[0] < 0) //negative numbers
    {
        message.channel.send("❌ **You need to provide a positive number!**");
    }
    else
    if(args[0] > 1) //only first number, no second number -> moves song to top of list
    {
        const convert = parseInt(args[0]);
        const addOne = convert + 1;
        const oldPosition = serverQueue.songs.indexOf(serverQueue.songs[addOne]);
        let current = serverQueue.songs[args[0]].title;
        
        serverQueue.songs.splice(1, 0, serverQueue.songs[args[0]]);
        serverQueue.songs.splice(oldPosition, 1);
        message.channel.send(`Successfully moved **${current}** to the top of the queue!`);
    }
}

module.exports.help = {
    name: "move",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}