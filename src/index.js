// Loads up the discord.js library
const Discord = require("discord.js");

// Here we load the token and prefix from the config file.
const { token, prefix } = require("./config/config");

// This is your client. When you see 'client.something' this is what we're refering to.
const client = new Discord.Client();

client.on('ready', () => {

    // This event will run if the bot starts and logs in successfully.
    console.log(`${client.user.username} is online and serving ${client.users.cache.size} user(s).`);
    console.log(`made by armful#0001`)
    
    // This will change the bot's status.
    // In this case we will display how many users have access to the bot.
    client.user.setActivity(`armful#0001`, {   type: 'WATCHING'   });
    
});

// This event will run on every single message received.
client.on('message', async message => {

    // It's common practice to ignore other bots, this also makes your bot ignore itself.
    if(message.author.bot) return;
    
    // This ignores any message that does not start with our prefix.
    if(!message.content.startsWith(prefix)) return;
    
    // This will separate our command name and our arguments for the command.
    // As an example, if our command is ".say hello world", we would get the following;
    // command = say
    // args = ['hello', 'world']
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    // Let's make a simple command to make sure the bot works properly.
    if (command === 'ping') {
        
        const msg = await message.channel.send('Calculating ping...');
        msg.edit(`Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\`\nAPI Latency: \`${Math.round(client.ws.ping)}ms\`\n \nby armful#0001`);

    }
    
});

// Logs in using your token.
client.login(token);