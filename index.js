const Discord = require ('discord.js');
const client = new Discord.Client();
const botconfig = require('./botconfig.json');
const fs = require('fs');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//SERVER QUEUE
const queue = new Map();

//cooldown to prevent F spam
const fRecently = new Set();

//read command files
fs.readdir("./commands/", (err, files) =>
{
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0)
    {
        return console.log("No commands found!");
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        //console.log(`${f} loaded!`);
        client.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        })
    })
})

//read other commands
fs.readdir("./commands/other", (err, files) =>
{
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0)
    {
        return console.log("No commands found!");
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/other/${f}`);
        //console.log(`${f} loaded!`);
        client.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        })
    })
})

//STATUS and CONSOLE LOG FOR ONLINE
client.on('ready',() =>
{
    console.log('This bot is online!');
    //client.user.setActivity("testing!!")
    client.user.setActivity("bb.help", {
        type: "LISTENING"}); //status
})

client.on('message', async message =>
{
    if(message.channel.type === "dm") return;
    if(message.author.id === client.user.id) return;

    //set prefix
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefix: botconfig.prefix
        }
    }
    let prefix = prefixes[message.guild.id].prefix;

    //current prefix of server
    if(message.content == "bb.prefix")
    {
        return message.channel.send("**Current prefix for this server is: **" + "`" + prefix + "`");
    }

    //pay respects w/o prefix needed
    if(message.content == "F" || message.content == "f")
    {
        if(fRecently.has(message.author.id))
        {
            return message.channel.send("**Please wait 1 second to pay your respects again.**");
        }
        else
        {
            message.channel.send(`**${message.author.username}** paid their respects.`);
            fRecently.add(message.author.id);
            setTimeout(() =>
            { 
                fRecently.delete(message.author.id);
            }, 1000);
        }
    }

    //check prefix and define args + command
    if(!message.content.startsWith(prefix)) return;
    
    const serverQueue = queue.get(message.guild.id);

    let ops = {
        queue: queue
    }
    
    let args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase();
    let command;
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, args, ops);

    //run commands
    if(client.commands.has(cmd))
    {
        command = client.commands.get(cmd);
    }
    else
    if(client.aliases.has(cmd))
    {
        command = client.commands.get(client.aliases.get(cmd));
    }

    try{
        command.run(client, message, args, serverQueue, ops);
    } catch (e)
    {
        return;
    }
})

client.login(botconfig.token);