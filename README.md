## Discord.js Bot Guide
This guide will get you started with Discord.js development, setting you up with a decent bot template.  
Feel free to just download the code and take the parts you need if you are not interested in following the guide, or if you already know what you are doing.

Make sure you have installed [NPM](https://www.npmjs.com/get-npm) before following this guide.

###### What will we go over in this guide?
- Installing NPM.
- Creating a Discord Bot account.
- Setting up required files.

### Step 1 | Creating the bot.

In order to work with the Discord.js library and Discord API, we must first create a Discord Bot account.

1. Make sure you are logged in to [Discord](https://discord.com).

2. Head over to the [Application Page](https://discord.com/developers/applications).

3. Click the `New Application` button.

![armful#0001](https://i.imgur.com/T5b5eJi.png)

4. Give your application a name and click `Create`.

![armful#0001](https://i.imgur.com/uez6R6g.png)

5. Navigate to the `Bot` tab and click `Add Bot`.
    - You will be promted with a confirmation window, click `Yes, do it!`.

![armful#0001](https://i.imgur.com/v4lV2uR.png)

6. Under the `Bot` tab copy your token by clicking `Copy`.

![armful#0001](https://i.imgur.com/QCWJmXb.png)

7. Under `Authorization Flow` keep the default settings for `Public Bot` checked and `Require OAuth2 Code Grant` unchecked.
8. 
![armful#0001](https://i.imgur.com/DiYGRyo.png)

8. Under `Privileged Gateway Intents` check both `Presence Intent`and `Server Members Intent`.

![armful#0001](https://i.imgur.com/U1aWMhf.png)

---

### Step 2 | Inviting your bot to a server.

1. Navigate to the `OAuth2` tab, scroll down to `scopes`, and tick `bot`.

2. A new menu labeled `Bot Permissions` will appear, tick `Administrator`.

3. A URL will be generated in the `scopes` menu, click `copy` and paste the URL into a new tab.
![armful#0001](https://i.imgur.com/hkL38da.png)

4. Click `Select a server`, choose a server to invite your bot to, and click `Continue`.
![armful#0001](https://i.imgur.com/VOvuf88.png)

5. Make sure `Administrator` is checked and click `Authorize`.
    - You might be prompted with a Captcha challenge, just complete it and move on.
![armful#0001](https://i.imgur.com/utr3BQx.png)

### Step 3 | Setting up your Bot folder and Installing discord.js.

1. Create a new folder and give it a name.

2. Within your bot folder, create a new folder and name it **config**.

3. Open `Command Prompt` and navigate to your bot folder using `cd file-path`.
    - EX: `cd D:\bots\bot`

4. Install `discord.js` using `npm i discord.js`.

---

### Step 4 | Setting up your Config file.

2. Within your bot folder create another folder and name it `config`.

3. Create a new file in your config folder and name it `config.js`.

4. Copy the code below and replace `your-token` with your bot's token, and `your-prefix` with your desired prefix.
```js
module.exports = {
    token: "your-token",
    prefix: "your-prefix"
}
```

Example:
```js
module.exports = {
    token: "ODAxODYyNTMzNDA1MDgxNjEw.YAm2rQ.9I4FhVNBFbvLZNmPUOY_jBtDi38",
    prefix: "!"
}
```

---

### Step 5 | Creating your Index file.

1. Create a new file and name it `index.js`.

2. Firstly, we need to define `Discord`, `token`, and `client`.
```js
// Loads up the discord.js library
const Discord = require("discord.js");

// Here we load the token and prefix from the config file.
const { token, prefix } = require("./config/config");

// This is your client. When you see 'client.something' this is what we're refering to.
const client = new Discord.Client();
```

3. Logging when our bot starts.
```js
client.on('ready', () => {

    // This event will run if the bot starts and logs in successfully.
    console.log(`${client.user.username} is online and serving ${client.users.cache.size} user(s).`);
    
    // This will change the bot's status.
    // In this case we will display how many users have access to the bot.
    client.user.setActivity(`${client.users.cache.size} users.`, {   type: 'WATCHING'   });
    
});
```

4. Handling message events.
```js
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
        msg.edit(`Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\`\nAPI Latency: \`${Math.round(client.ws.ping)}ms\``);

    }
});
```

5. We can finally log in to our bot using `token` which we have already defined.
```js
client.login(token); // Logs in using your token.
```

---

### Events

Make sure you create a file with the event name you want to listen for.  
Event files should be created under `events/file-name.js`

Example: `ready.js`
```js
const Discord = require("discord.js");

module.exports = async client => {

    console.log(`made by: armful#0001`);
    console.log(`${client.user.tag} is active in ${client.guilds.cache.size} server(s)\nServing ${client.users.cache.size} user(s).`);

client.user.setActivity(`by armful#0001`, { type:"WATCHING" });

}
```

---

### Command Example

```js
const Discord = require("discord.js");
const { getMember } = require("../../callfunction.js");

module.exports = {
  config: {
      name: "avatar",
      category: "misc",
      description: "displays @user's avatar.",
      usage: "(@user)",
      accessableby: "Members",
      aliases: ["av"]
  },
run: async (client, message, args) => {

const member = getMember(message, args.join(" "));

if (!member) {
      return message.channel.send(`${message.author}, that user was not found.\nUsage: \`.avatar @user\``);
  } else if (member) {

        let image = member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 });

        let embed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.username}#${member.user.discriminator}'s Avatar`)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
            .setImage(image)

        message.channel.send(embed);
        
      }
    }
  }
```

### Used later

3. Next we need to add our handlers. In this case we are passing in **aliases** and **commands** for our modular help command, and **console**, **commands**, and **event** as our handlers.
```js
["aliases", "commands"].forEach(x => client[x] = new Discord.Collection());
["console", "commands", "event"].forEach(x => require(`./handlers/${x}`)(client));
```

Install `fs` using `npm i fs`.

### By: [armful#0001](https://github.com/armfxl)
###### Feel free to reach out to me for support.

<p>
<a href="https://nodei.co/npm/discord.js/"><img src="https://nodei.co/npm/discord.js.png?downloads=true&stars=true"></a>
</p>
