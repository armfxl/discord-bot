## Discord.js Bot Tutorial

This tutorial will get you started with Discord.js development, setting you up with a decent bot template.

### Step 1.

In order to work with the Discord.js library and Discord API, we must first create a Discord Bot account.

1. Make sure you are logged in to [Discord](https://discord.com).
2. Head over to the [Application Page](https://discord.com/developers/applications).

3. Click the `New Application` button.

![](https://i.imgur.com/T5b5eJi.png)

4. Give your application a name and click `Create`.

### Step 2.

Install `discord.js` and `fs` using `npm i discord.js fs`.
You can also install them seperately using `npm i discord.js` and `npm i fs`

---
    
### Step 2.

Replace `token` and `prefix` in `config/config.js`

Example:
```js
module.exports = {
    token: "ODAxODYyNTMzNDA1MDgxNjEw.YAm2rQ.9I4FhVNBFbvLZNmPUOY_jBtDi38",
    prefix: "."
}
```

---

### Index Template
```js
const { token, prefix } = require("../config/config.js");
const Discord = require("discord.js");
const client = new Discord.Client();

["aliases", "commands"].forEach(x => client[x] = new Discord.Collection());
["console", "commands", "event"].forEach(x => require(`./handlers/${x}`)(client));

client.login(config.token);
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

<p>
<a href="https://nodei.co/npm/discord.js/"><img src="https://nodei.co/npm/discord.js.png?downloads=true&stars=true"></a>
</p>
