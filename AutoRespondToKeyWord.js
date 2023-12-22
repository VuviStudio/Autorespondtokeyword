const { Client, Intents } = require('discord.js-selfbot-v13');
const fs = require('fs');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    checkUpdate: false,
});

let keywordResponses = new Map();

try {
    const data = fs.readFileSync('responses.json', 'utf8');
    keywordResponses = new Map(Object.entries(JSON.parse(data)));
} catch (err) {
    console.error('Error reading responses from file:', err);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id) return;

    const content = message.content.toLowerCase();


    for (const [keyword, response] of keywordResponses.entries()) {
        if (content.includes(keyword)) {
            message.channel.send(response)
                .catch((err) => console.error('Error sending message:', err));
            break;
        }
    }
});

client.login('UrToken');
