import {Message} from './messages.js';
import {Bot} from './bot.js';

export function initForm() {
	const form = document.querySelector('#chat-form');
	const input = document.querySelector('#message-input');
	const chatBox = document.querySelector('#chat-box');

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		await Message.sendMessage({
			content: input.value,
			senderName: 'User',
			date: Date.now(),
			avatar: 'avatar-1.png',
			fromUser: true
		});

		const botList = Bot.getBotList();

		for (const bot of botList) {
			for (const command of bot.commands) {
				const regex = new RegExp(command.pattern);
				if (regex.test(input.value)) {
					const match = regex.exec(input.value);
					await Message.sendMessage({
						content: await command.fetch(match[1]),
						senderName: bot.botName,
						date: Date.now(),
						avatar: bot.botAvatarSrc,
						fromUser: false
					});
				}
			}
		}

		chatBox.scrollTop = chatBox.scrollHeight;
		input.value = '';
	});
}