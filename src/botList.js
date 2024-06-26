import {Bot} from './bot.js';

export const botList = [
	{
		visible: true,
		botName: "Blague à la demande",
		botAvatarSrc: "avatar-1.png",
		commands: [
			{
				pattern: /Qui est-ce/i,
				fetch: () => "Je suis un bot de blague"
			},
			{
				help: "Raconte moi une blague",
				pattern: /blague(?!s | de)/i,
				fetch: async () => {
					return await fetch('https://icanhazdadjoke.com', {
						headers: {
							'Accept': 'text/plain'
						}
					})
					.then(response => response.text())
					.then(data => data);
				}
			},
			{
				help: "Raconte moi plusieurs blagues",
				pattern: /plusieurs blagues/i,
				fetch: async () => {
					return await fetch('https://icanhazdadjoke.com/search', {
						headers: {
							'Accept': 'application/json'
						}
					})
					.then(response => response.json())
					.then(data => data.results.map(j => j.joke).join('<br>'));
				}
			},
			{
				help: "Raconte moi une blague de hipster",
				pattern: /blague de (\w+)/i,
				fetch: async (term) => {
					return await fetch(`https://icanhazdadjoke.com/search?term=${term}`, {
						headers: {
							'Accept': 'application/json'
						}
					})
						.then(response => response.json())
						.then(data => data.results?.[0]?.joke ?? "Aucune blague trouvée");
				}
			}
		]
	},
	{
		visible: true,
		botName: "Chat dit quoi?",
		botAvatarSrc: "avatar-2.png",
		commands: [
			{
				pattern: /Qui est-ce/i,
				fetch: () => "Je suis un bot d'anecdote sur les chats"
			},
			{
				help: "Donne moi une anecdote sur les chats",
				pattern: /anecdote sur les chats/i,
				fetch: async () => {
					return await fetch(`https://meowfacts.herokuapp.com/`)
						.then(response => response.json())
						.then(data => data.data?.[0] ?? "Aucune anecdote trouvée");
				}
			},
			{
				help: "Donne moi 3 anecdotes sur les chats",
				pattern: /(\d+) anecdotes sur les chats/i,
				fetch: async (count) => {
					return await fetch(`https://meowfacts.herokuapp.com/?count=${count}`)
						.then(response => response.json())
						.then(data => data.data.join('<br>'));
				}
			},
			{
				help: "Donne moi une anecdote en esp sur les chats",
				pattern: /anecdote en (\w+) sur les chats/i,
				fetch: async (lang) => {
					return await fetch(`https://meowfacts.herokuapp.com/?lang=${lang}`)
						.then(response => response.json())
						.then(data => data.data?.[0] ?? "Aucune anecdote trouvée");
				}
			}
		]
	},
	{
		visible: true,
		botName: "Bot de langue",
		botAvatarSrc: "avatar-3.png",
		commands: [
			{
				pattern: /Qui est-ce/i,
				fetch: () => "Je suis un bot linguistique"
			},
			{
				help: "Synonyme de help",
				pattern: /Synonyme de (\\w+)/i,
				fetch: async (text) => {
					return await fetch(`https://api.datamuse.com/words?ml=${text}&max=5`)
						.then(response => response.json())
						.then(data => data.map(d => d.word).join('<br>'));
				}
			},
			{
				help: "Mots qui commencent par h",
				pattern: /Mots qui commencent par (\w+)/i,
				fetch: async (text) => {
					return await fetch(`https://api.datamuse.com/words?sp=${text}*&max=5`)
						.then(response => response.json())
						.then(data => data.map(d => d.word).join('<br>'));
				}
			},
			{
				help: "Mots qui terminent par p",
				pattern: /Mots qui terminent par (\w+)/i,
				fetch: async (text) => {
					return await fetch(`https://api.datamuse.com/words?sp=*${text}&max=5`)
						.then(response => response.json())
						.then(data => data.map(d => d.word).join('<br>'));
				}
			}
		]
	},
	{
		botName: "Help bot",
		botAvatarSrc: "avatar-1.png",
		visible: false,
		commands: [
			{
				help: "Liste des commandes",
				pattern: /help/i,
				fetch: async () => {
					const botList = Bot.getBotList().filter(b => b.visible);
					return botList.map(bot => bot.commands.filter(c => c.help).map(command => command.help).join('<br>')).join('<br>');
				}
			}
		]
	}
]