module.exports.config = {
	name: "ss",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Prince Sanel",
	description: "screenshot an link",
	commandCategory: "Picture",
	usages: "[link]",
	cooldowns: 1,
	
	}; // credit for api: sensui
			
module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	const req = args[0];
	if (!args[0]) return api.sendMessage("[!] Need an link to screenshot.", event.threadID, event.messageID);
	axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/ss?url=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `❯ Query: ${req}\n❯ Screenshot you've requested:`,
						attachment: fs.createReadStream(__dirname + `/cache/ss.jpeg`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/ss.jpeg`), event.messageID);
				};
				request(res.data.image).pipe(fs.createWriteStream(__dirname + `/cache/ss.jpeg`)).on("close", callback);
			})
    }