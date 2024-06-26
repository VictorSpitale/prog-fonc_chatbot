import {History} from './history.js';

export class Message {
	constructor(content, senderName, date, avatar, fromUser) {
		this.content = content;
		this.date = date;
		this.senderName = senderName;
		this.avatar = avatar;
		this.fromUser = fromUser;
	}

	/**
	 *
	 * @returns {Promise<void>}
	 */
	async renderMessage() {
		const messageContainer = document.querySelector('#chat-box');
		const messageItemHtml = await (await fetch('./src/components/message.html')).text();
		const parser = new DOMParser();
		const messageItem = parser.parseFromString(messageItemHtml, 'text/html').firstChild;

		messageItem.querySelector('[item-type="message"]').innerHTML = this.content;
		messageItem.querySelector('[item-type="name"]').innerHTML = this.senderName;
		messageItem.querySelector('[item-type="date"]').innerHTML = new Date(this.date).toLocaleString();

		if(this.fromUser) {
			messageItem.querySelector(".message-block").classList.add('flex-row-reverse');
			messageItem.querySelector(".message-info").classList.add('text-right');
			messageItem.querySelector('[item-type="avatar"]').remove();
		} else {
			const response = await fetch('./src/assets/' + this.avatar);
			const blob = await response.blob();
			messageItem.querySelector('[item-type="avatar"]').src = URL.createObjectURL(blob)
		}

		messageContainer.appendChild(messageItem);
	}

	/**
	 *
	 * @param content
	 * @param senderName
	 * @param date
	 * @param avatar
	 * @param fromUser
	 * @returns {Promise<void>}
	 */
	static async sendMessage({content, senderName, date, avatar, fromUser}) {
		const message = new Message(content, senderName, date, avatar, fromUser);
		await message.renderMessage();
		History.addMessageToHistory(message);
	}

	/**
	 *
	 * @returns {Promise<void>}
	 */
	static async initMessageHistory() {
		const history = History.getMessageHistory();
		for (const message of history) {
			await message.renderMessage();
		}
		const chatBox = document.querySelector('#chat-box');
		chatBox.scrollTop = chatBox.scrollHeight;
	}

}
