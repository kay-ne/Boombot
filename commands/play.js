const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const Youtube = require('simple-youtube-api');
const botconfig = require("../botconfig.json");
const youtube = new Youtube(botconfig.youtubeAPI);
const fs = require('fs');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    //process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
    require('events').EventEmitter.defaultMaxListeners = 15;
    let count = 0; //count for songs in playlist-- if error occurs, count is decreased
    let totalSongs = 0;
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
    {
        return message.channel.send(
            "❌ **You need to be in a voice channel to play music!**"
        );
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) 
    {
        return message.channel.send(
            "❌ **I need permissions to join and speak in your voice channel!**"
        );
    }
    if(serverQueue && message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to play music!**"
        );
    }
    
    if(!args[0]) return message.channel.send( //nothing after prefix
        "❌ **You need to provide a __valid__ YouTube link or a search query!**"
    );
    else //playlist
    if(args[0].match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/))
    {
        try
        {
            let msg = await message.channel.send("`Please wait till there is a success before adding more songs...`");
            const playlist = await youtube.getPlaylist(args[0]);
            const videos = await playlist.getVideos();
            for(const video of Object.values(videos))
            {
                const video2 = await ytdl.getURLVideoID(video.shortURL);
                const video2url = `https://www.youtube.com/watch?v=${video2}`;
                if(count < 100)
                {
                    await handlevideo(video2url, message, voiceChannel, true);
                    count++;
                    totalSongs++;
                }
            }
            message.channel.send(`✅ **${count}/${totalSongs}** songs from playlist **${playlist.title}** has been added to the queue!\n*if some songs are missing, the video was either private, deleted, or unavailable to play*`);
            msg.delete();
            return;
        }
        catch{
            return message.channel.send(`❌ **Sorry this playlist could either be private or not be found!**`);
        }
    }
    else //search
    if(!ytdl.validateURL(args[0]))
    {
        let commandFile = require(`./playSearch.js`);
        return commandFile.run(client, message, args, serverQueue, ops);
    }
    else //link
    {
        var video = args[0];
        return handlevideo(video, message, voiceChannel);
    }
    
    async function handlevideo(video, message, voiceChannel, playlist = false)
    {
        const serverQueue = ops.queue.get(message.guild.id);

        //play link
        try
        {
            const songInfo = await ytdl.getInfo(video);
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                thumbnail: songInfo.videoDetails.videoId, //use this to see list of thumbnails //thumbnail: songInfo.videoDetails.thumbnail,
                requester: message.author.username,
                duration: songInfo.videoDetails.lengthSeconds,
                channel: songInfo.videoDetails.ownerChannelName
            };

            if(!serverQueue || !serverQueue.songs[0] && !serverQueue.songs[1])
            {
                const queueContruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: .50,
                    start: 0,
                    playing: true,
                    loop: false
                };

                ops.queue.set(message.guild.id, queueContruct);

                queueContruct.songs.push(song);

                try{
                    let msg = await message.channel.send("`Please wait for the Now Playing message before adding more songs...`");
                    var connection = await voiceChannel.join();
                    queueContruct.connection = connection;
                    if(song === null)
                    {
                        return message.channel.send("❌ **Sorry an error occurred, please try again!**");
                    }
                    else
                    if(song.duration === 0) //livestream
                    {
                        play(message.guild, queueContruct.songs[0]);
                        message.channel.send(`Now Playing: **${song.title}**`);
                        msg.delete();
                    }
                    else
                    {
                        play(message.guild, queueContruct.songs[0]);
                        message.channel.send(`Now Playing: **${song.title}**`);
                        queueContruct.start = Date.now();
                        msg.delete();
                    }
                } catch (err) {
                    console.log(err);
                    queue.delete(message.guild.id);
                    message.channel.send(err);
                    return;
                }
            }
            else
            {
                serverQueue.songs.push(song);
                let index = serverQueue.songs.indexOf(song);
                if(playlist) return;
                else return message.channel.send(`✅ **${song.title}** has been added to the queue!\n**Queue Postition: ** ${index}`);
            }
            return;
        }
        catch
        {
            if(playlist)
            {
                count--;
                return;
            }
            else return message.channel.send("❌ **Sorry an error occurred!**");
        }
    }

    function play(guild, song)
    {
        const serverQueue = ops.queue.get(guild.id);
        if(serverQueue.songs[0] != undefined)
        {
            if(serverQueue.songs[0].duration < 1 && serverQueue.songs[0].duration > -1) //livestream
            {
                dispatcher = serverQueue.connection //highWaterMark: 1<<25}
                    .play(ytdl(song.url, {filter:"audioonly", quality:[95]}), {highWaterMark: 1})
                    .on("finish", () => 
                    {
                        serverQueue.songs.shift();
                        play(guild, serverQueue.songs[0]);
                    })
                .on("error", error => console.log("Livestream error: " + error));
                dispatcher.setVolumeLogarithmic(serverQueue.volume);
            }
            else
            if(serverQueue.songs[0].duration > 0)
            {
                dispatcher = serverQueue.connection
                    .play(ytdl(song.url, {filter:"audioonly", highWaterMark: 1<<25}), {highWaterMark: 1})
                    .on("finish", () => 
                    {
                        if(serverQueue.loop === true)
                        {
                            try
                            {
                                serverQueue.songs.unshift(serverQueue.songs.shift()); //removes current song and unshifts to first position
                                play(guild, serverQueue.songs[0]);
                                serverQueue.start = Date.now();
                            }
                            catch(err)
                            {
                                message.channel.send("Couldn't play the song! Will skip to the next song in queue if available!");
                                serverQueue.loop = false;
                                if(serverQueue.songs[1])
                                {
                                    serverQueue.songs.shift();
                                    play(guild, serverQueue.songs[0]);
                                    serverQueue.start = Date.now();
                                }
                                else return;
                            }
                        }
                        else
                        {
                            serverQueue.songs.shift();
                            play(guild, serverQueue.songs[0]);
                            serverQueue.start = Date.now();
                            return;
                        }
                    })
                .on("error", error => console.log(error));
                dispatcher.setVolumeLogarithmic(serverQueue.volume);
            }
        }
        else
        {
            if(!serverQueue.songs[1])
            {
                return;
            }
            else return;
            // return message.channel.send("**Sorry, something went wrong!**");
        }
    }
}

module.exports.help = {
    name: "play",
    aliases:["p"], //to add more aliases separate with commas ex: "p", "pin"
}

//put under dispatcher.setVolume----- to announce song
//serverQueue.textChannel.send(`Now Playing: **${song.title}**`);