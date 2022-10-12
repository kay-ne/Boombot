const Discord = require("discord.js");

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    let helpEmbed = new Discord.MessageEmbed()
        .setColor('#5d97be')
        .setAuthor('Music Commands', 'https://imgur.com/xBzkgG0.png')
        .setDescription('for `non-music commands` type `bb.other`\n\n**join** [aka: j]\n-> joins voice channel\n**play** [aka: p]\n-> play <link/query/playlist> | playlist- limits to 100 songs\n**pause** [aka: pa]\n-> pauses music\n**resume** [aka: re]\n-> resumes music\n**loop** [aka: l]\n-> loops current song | type the command again to disable\n**skip** [aka: s, sk]\n-> skip OR skip <# of songs including current> | skips song(s)\n**now playing** [aka: np, now]\n-> current song playing\n**search**\n-> search <query>\n**queue** [aka: q]\n-> lists queue\n**remove** [aka: r]\n -> remove <#> OR remove <start> <end> | removes a song/songs from queue\n**shuffle** [aka: sh]\n-> shuffles queue, (for shorter queues) reshuffle if queue is the same\n**clear** [aka: cl]\n-> clears queue except current song\n**move**\n-> move <current position> | moves the song you want to the top of the queue\n**volume** [aka: vol, v]\n!!default vol is 50!!\n-> volume <1-100> | no # gives current vol. -- **effects everyone**\n**leave** [aka: le]\n-> leaves voice channel\n\n(only avail. to server owner)\n**prefix**\n-> prefix <new prefix> | to get the current prefix of the server you can use default prefix: `bb.prefix`')
    message.channel.send(helpEmbed);
}

module.exports.help = {
    name: "help",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}

//\n**announce**\n-> announces everytime the next song starts | type command again to disable