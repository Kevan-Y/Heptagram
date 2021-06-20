/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require('discord.js');
const chalk = require('chalk');
const { prefix, token } = require('./config.json');
const mongo = require('./mongo');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
	require(`./handlers/${handler}`)({ client, Discord });
});

// mongoose.connect((MongoDB), {
//	useNewUrlParser: true,
//	useUnifiedTopology: true,
//	useFindAndModify: false,
// }).then(() => {
//	console.log(chalk.blue('Connected to Heptagram MongoDB database!'));
// }).catch((err) => {
//	console.log(err);
// });
client.on('ready', async () => {
	console.log(chalk.blueBright('Bot online and Ready!'));

	await mongo().then(mongoose => {
		try {
			console.log(chalk.green('Connected to Mongo!'));
		}
		finally {
			mongoose.connection.close();
		}
	});
});

client.on('message', async message => {
	const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
	if (message.content.match(prefixMention)) {
	  return message.reply(`Hey there! Need some help? My commands can be accessed through my prefix. My prefix in this server is \`${prefix}\`. You can use \`${prefix}help\` for a list of all my commands.`);
	}
});

client.login(token);
