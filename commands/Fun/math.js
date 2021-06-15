const { MessageEmbed } = require('discord.js');
const math = require('mathjs');
const { colors } = require('../../config.json');


module.exports = {
	name: 'math',
	category: 'fun',
	execute({ message, args }) {
		try {
			if (!args[0]) return message.channel.send('Please Give Me Equation!');

			const embed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle('Result')
				.setDescription(math.evaluate(args.join(' ')))
				.setTimestamp();

			message.channel.send(embed);
		}
		catch (error) {
			message.channel.send('Please Give Me Valid Equation | Try Again Later!').then(() => console.log(error));
		}
	},
};
