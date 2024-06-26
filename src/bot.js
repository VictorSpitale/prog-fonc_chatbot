import {botList} from './botList.js';

export class Bot {
	constructor (botName, botAvatarSrc, visible, commands) {
		this.botName = botName;
		this.botAvatarSrc = botAvatarSrc;
		this.visible = visible;
		this.commands = commands
	}

	/**
	 *
	 * @returns {Promise<Element>}
	 */
	async getBotElement() {
		const botItemHtml = await (await fetch('./src/components/botItem.html')).text();

		const parser = new DOMParser();

		const botItem = parser.parseFromString(botItemHtml, 'text/html').querySelector('.bot-item');
		botItem.querySelector('#bot-name').innerText = this.botName;

		const response = await fetch('./src/assets/' + this.botAvatarSrc);
		const blob = await response.blob();
		botItem.querySelector('#bot-avatar').src = URL.createObjectURL(blob);

		return botItem;
	}

	/**
	 *
	 * @returns {Promise<void>}
	 */
	static async initBotList() {
		const botList = Bot.getBotList().filter(b => b.visible);

		if(botList.length === 0) return;

		const botContainer = document.querySelector('#bot-list');

		for (const bot of botList) {
			botContainer.appendChild(await bot.getBotElement());
		}
	}

	/**
	 *
	 * @returns {Bot[]}
	 */
	static getBotList() {
		return botList.map(botData => new Bot(botData.botName, botData.botAvatarSrc, botData.visible, botData.commands));
	}
}
