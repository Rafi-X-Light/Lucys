const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "fbget",
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "Download video from Facebook",
    longDescription: "Download video from Facebook",
    category: "𝗠𝗘𝗗𝗜𝗔",
    guide: "{pn}fbget [video link]",
  },
  onStart: async function ({ api, event, args }) {
    try {
      let videoLink = args.join(" ");

      if (!videoLink && event.attachments && event.attachments.length > 0 && event.attachments[0].playableUrl) {
        videoLink = event.attachments[0].playableUrl;
      }

      if (!videoLink) {
        return api.sendMessage(`No video link provided. Please provide a valid Facebook video link.`, event.threadID, event.messageID);
      }

      api.sendMessage(`Processing request!!!`, event.threadID, (err, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID);
        }, 100);
      }, event.messageID);

      const path1 = __dirname + `/cache/1.mp4`;

     
      if (event.attachments && event.attachments.length > 0 && event.attachments[0].playableUrl) {
        let videoData = (await axios.get(event.attachments[0].playableUrl, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(path1, Buffer.from(videoData, "binary"));
      } else {
        return api.sendMessage(`No video attachment found. Please provide a valid Facebook video link.`, event.threadID, event.messageID);
      }

      return api.sendMessage(
        {
          body: `Your Request`,
          attachment: fs.createReadStream(path1),
        },
        event.threadID,
        () => fs.unlinkSync(path1),
        event.messageID
      );
    } catch (error) {
      console.error(error);
      return api.sendMessage(`Unable to process request`, event.threadID, event.messageID);
    }
  },
};
