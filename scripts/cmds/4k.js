 module.exports = {
  config: {
    name: "4k",
    version: "0.0.1",
    author: "DC-Nam",
    description: {
      en: "Increase image quality to 4K",
    },
    commandCategory: {
      en: "Images",
    },
    usage: "[image]",
    cooldowns: 3,
  },

  langs: {
    en: {
      replyPhoto: "Please reply with 1 photo!",
      increaseResolution: "Increasing the resolution for {count} image(s) ({time}s)",
      successful: "Successful ({time}s)",
    },
  },

  onStart: async function ({ api, event, getLang }) {
    let send = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

    if (event.type != "message_reply") return send(getLang("replyPhoto"));

    send(getLang("increaseResolution", { count: event.messageReply.attachments.length, time: event.messageReply.attachments.length * 3 }));

    let stream = [];
    let exec_time = 0;

    for (let i of event.messageReply.attachments) {
      try {
        let res = await require("axios").get(encodeURI(`https://nams.live/upscale.png?{"image":"${i.url}","model":"4x-UltraSharp"}`), {
          responseType: "stream",
        });

        exec_time += +res.headers.exec_time;
        const eta = (res.headers.exec_time / 1000) << 0;

        res.data.path = "tmp.png";
        stream.push(res.data);
      } catch (e) {}
    }

    send({
      body: getLang("successful", { time: (exec_time / 1000) << 0 }),
      attachment: stream,
    });
  },
};