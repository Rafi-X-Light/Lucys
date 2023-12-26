const axios = require('axios');
const request = require('request');
const fs = require("fs");

module.exports.config = {
	name:"shoti",
	version: "1",
	hasPermssion: 0,
	credits: "Eugene Aguilar", 
	description: "Generate random shoti from source api",
	commandCategory: "no prefix",
	usages: "...",
	cooldowns: 6,
};
const lugmok = 'https://php-api.diciper09.repl.co';
module.exports.handleEvent = async function ({ api, event }) {
	 if (!(event.body.indexOf("shoti") === 0 || event.body.indexOf("Shoti") === 0)) return;
   

  api.sendMessage(`😝 | 𝙑𝙞𝙙𝙚𝙤 𝙞𝙨 𝙨𝙚𝙣𝙙𝙞𝙣𝙜 𝙥𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩...`, event.threadID, event.messageID);
axios.get(`${lugmok}/shoti/?apikey=omsimnida`).then(res => {

	const author = res.data.author;
	const source = res.data.source;
	const title = res.data.title;
	
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
																body: `Title: ${title}\nAuthor: ${author}\n Source: ${source}`,
						attachment: fs.createReadStream(__dirname + `/cache/shoti.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/shoti.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/shoti.${ext}`)).on("close", callback);
			}) .catch(err => {
							api.sendMessage("error na bai maya naman", event.threadID, event.messageID);
	 api.setMessageReaction("❌", event.messageID, (err) => {}, true);
						})     
}
module.exports.run = async function ({ api, event }) {
	 api.sendMessage(`This command doesn't need a prefix`, event.threadID, event.messageID);

};
