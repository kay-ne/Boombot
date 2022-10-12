const { MessageEmbed } = require ('discord.js');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!serverQueue)
    {
        return message.channel.send("❌ **There are no songs in queue!**");
    }
    else
    if(!serverQueue.songs[1] && serverQueue.songs[0].title != undefined)
    {
        let embed = new MessageEmbed()
            .setColor('#5cbeff')
            .setAuthor('Queue', 'https://imgur.com/xBzkgG0.png')
            .setDescription(`**__Current Song__: ** [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) | Requested By: ${serverQueue.songs[0].requester}`)
        return message.channel.send(embed);
    }
    else
    if(serverQueue.songs[0] === undefined)
    {
        console.log("Error, can't read title of undefined!");
        return;
    }
    else
    {
        let currentPage = 0;
        const embeds = generateQueueEmbed(serverQueue);
        const queueEmbed = await message.channel.send(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
        await queueEmbed.react('⬅️');
        await queueEmbed.react('➡️');

        const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && (message.author.id === user.id);
        const collector = queueEmbed.createReactionCollector(filter);

        collector.on('collect', (reaction, user) => {
            //next page
            if(reaction.emoji.name === '➡️') 
            {
                if(currentPage < embeds.length-1)
                {
                    currentPage++;
                    queueEmbed.edit(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
                    reaction.users.remove(user.id);
                }
            }
            //back page ⬅️
            else
            if(reaction.emoji.name === '⬅️')
            {
                if(currentPage != 0)
                {
                    --currentPage;
                    queueEmbed.edit(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
                    reaction.users.remove(user.id);
                }
            }
        });
    }
}

module.exports.help = {
    name: "queue",
    aliases:["q"] //to add more aliases separate with commas ex: "p", "pin"
}

function generateQueueEmbed(serverQueue)
{
    const embeds = [];
    let k = 11;
    for(let i = 1; i < serverQueue.songs.length; i+=10)
    {
        const current = serverQueue.songs.slice(i, k);

        let queueDuration = 0;
        let count = 0;

        let j = i;
        k+=10; //keeps track of number slicing
        const info = current.map(track => `**${j++})** [${track.title}](${track.url}) | Requested By: ${track.requester}`).join('\n');

        for(let s = 1; s < serverQueue.songs.length; s++)
        {
            count=+s;
        }

        for(let q = 1; q < serverQueue.songs.length; q++)
        {
            queueDuration = parseInt(queueDuration) + parseInt(serverQueue.songs[q].duration);
        }

        //seconds to minutes etc
        let time = queueDuration;
        let hours = parseInt(time / 3600);
        let remainder = time - hours * 3600;
        let mins = parseInt((remainder) / 60);
        remainder = remainder - mins * 60;
        let secs = remainder;

        if(hours > 0 && hours < 10)
        {
            hours = (`0${hours}`);
        }
        if(hours < 1)
        {
            hours = (" ");
        }
        if(mins < 10)
        {
            mins = (`0${mins}`);
        }
        if(secs < 10)
        {
            secs = (`0${secs}`);
        }

        let times = {hours, mins, secs};

        if(times.hours != " ") //if hours is not empty -> send time with hours
        {
            const embed = new MessageEmbed()
                .setColor('#5cbeff')
                .setAuthor('Queue', 'https://imgur.com/xBzkgG0.png')
                .setDescription(`**__Current Song__: ** [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) | Requested By: ${serverQueue.songs[0].requester}\n\n**__Queue__:**\n${info}\n\n**Queued Songs: ** ${count} | **Total Length: ** ${times.hours}:${times.mins}:${times.secs}`)
                .setFooter('react to the arrows to go through pages.')
            embeds.push(embed);
        }
        else
        {
            const embed = new MessageEmbed()
                .setColor('#5cbeff')
                .setAuthor('Queue', 'https://imgur.com/xBzkgG0.png')
                .setDescription(`**__Current Song__: ** [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) | Requested By: ${serverQueue.songs[0].requester}\n\n**__Queue__:**\n${info}\n\n**Queued Songs: ** ${count} | **Total Length: ** ${times.mins}:${times.secs}`)
                .setFooter('react to the arrows to go through pages.')
            embeds.push(embed);
        }
    }
    return embeds;
}

//| **Total Duration:** ${times.hours}:${times.mins}:${times.secs}