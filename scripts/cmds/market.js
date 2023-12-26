const axios = require("axios");

module.exports = {
  config: {
    name: "goatmart",
    aliases: [ "market" ],
    shortDescription: {
      en: "View items available in the market."
    },
    category: "Market",
    usage: "{p}market [itemID]",
    version: "1.0",
    author: "LiANE",
  },
  onStart: async ({ api, event, args, message }) => {
    const serverURL = "https://goatmart.nealianacagara.repl.co"; // 

    try {
      if (!args[0]) {

        const response = await axios.get(`${serverURL}/api/items`);
        const items = response.data;

        if (items.length === 0) {
          api.sendMessage("No items available in the market.", event.threadID);
        } else {
          const itemDescriptions = items.map(
            (item) =>
              `Item Name: ${item.itemName}\nItem ID: ${item.itemID}\nDescription: ${item.description}\n\n`
          );
          const itemInfo = itemDescriptions.slice(0, 10).join("\n");

          message.reply(
            "〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\nItems available in the market:\n\n" + itemInfo + `Use ${event.body} < item id > to view pastebin link.`
          );
        }
      } else {
        // Fetch the pastebin link for the specified item ID
        const itemID = args[0];
        const response = await axios.get(`${serverURL}/api/items/${itemID}`);
        const item = response.data;

        if (item) {
          message.reply(
            `〖 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁 〗\n━━━━━━━━━━━━━━━\nItem Name: ${item.itemName}\nPastebin Link: ${item.pastebinLink}`
          );

        } else {
          api.sendMessage("Item not found.", event.threadID);
        }
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      api.sendMessage("Ayy, something's not right. Let's try again later! 💁", event.threadID);

    }
  },
};
