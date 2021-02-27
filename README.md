## Discord.js Bot Guide
This guide will get you started with Discord.js development, setting you up with a decent bot template.  
Feel free to just download the code and take the parts you need if you are not interested in following the guide, or if you already know what you are doing.

###### What will we go over in this guide?
- Creating a Discord Bot account.
- Setting up your config.

### Step 1 | Creating the bot.
In order to work with the Discord.js library and Discord API, we must first create a Discord Bot account.

1. Make sure you are logged in to [Discord](https://discord.com).
2. Head over to the [Application Page](https://discord.com/developers/applications).

3. Click the `New Application` button.

![armful#0001](https://i.imgur.com/T5b5eJi.png)

4. Give your application a name and click `Create`.

![armful#0001](https://i.imgur.com/uez6R6g.png)

5. Navigate to the `Bot` tab and click `Add Bot`.
    - You will be promted with a confirmation window, press `Yes, do it!`.

![armful#0001](https://i.imgur.com/v4lV2uR.png)

6. Under the `Bot` tab copy your token by clicking `Copy`.

![armful#0001](https://i.imgur.com/QCWJmXb.png)

Keep the default settings for `Public Bot` checked and `Require OAuth2 Code Grant` unchecked.

### Step 2 | Installing the required packages.
Install `discord.js` using `npm i discord.js`.  
Install `fs` using `npm i fs`.

---

### Step 3 | Setting up your Config file.

1. Create a new folder and give it a name.

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

### Step 4 | Creating your Index file.

1. Create a new file and name it `index.js`, and open it.

2. Firstly, we need to define `Discord`, `token`, and `client`.
```js
// Loads up the discord.js library
const Discord = require("discord.js");

// Here we load the token and prefix from the config file.
const { token, prefix } = require("../config/config.js");

// This is your client. When you see 'client.something' this is what we're refering to.
const client = new Discord.Client();
```

3. Next we need to add our handlers. In this case we are passing in **aliases** and **commands** for our modular help command, and **console**, **commands**, and **event** as our handlers.
```js
["aliases", "commands"].forEach(x => client[x] = new Discord.Collection());
["console", "commands", "event"].forEach(x => require(`./handlers/${x}`)(client));
```

4. We can finally log in to our bot using `token` which we have already defined.
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

### By: [armful#0001](https://github.com/armfxl)
###### Feel free to reach out to me for support.

<p>
<a href="https://nodei.co/npm/discord.js/"><img src="https://nodei.co/npm/discord.js.png?downloads=true&stars=true"></a>
</p>
