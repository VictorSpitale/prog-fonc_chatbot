import {Message} from './messages.js';

export class History {

	/**
	 * @param {Message[]} messages
	 * @returns {History}
	 */
	constructor(messages) {
		if(History.instance) return History.instance;

		History.instance = this;
		History.messages = messages;
	}

	/**
	 *
	 * @returns {History}
	 */
	static initHistory() {
		if(!History.instance) {
			new History(
				JSON.parse(localStorage.getItem('messageHistory') ?? '[]')
					.map(m => new Message(m.content, m.senderName, m.date, m.avatar, m.fromUser))
			);
		}
		return History.instance;
	}

	/**
	 *
	 * @returns {Message[]}
	 */
	static getMessageHistory() {
		if(!History.instance) History.initHistory();
		return History.messages;
	}

	/**
	 *
	 * @param message
	 */
	static addMessageToHistory(message) {
		if(!History.instance) {
			History.initHistory();
		}

		History.messages.push(message);
		localStorage.setItem('messageHistory', JSON.stringify(History.messages));
	}

}