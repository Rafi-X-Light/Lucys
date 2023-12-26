const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "genimg",
    aliases: [],
    author: "kshitiz",// api credit deku
    version: "2.o",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "Search image"
    },
    category: "ai",
    guide: {
      en: "{p}{n} <prompt> -<number of images to show>"
    }
  },
  onStart: async function ({ api, event, args }) {

    const [prompt, numberOfImages] = args.join(' ').split('-').map(arg => arg.trim());


    const numImagesToShow = numberOfImages ? parseInt(numberOfImages) : 5;


    const apiUrl = `https://free-api.ainz-sama101.repl.co/others/genimg?prompt=${encodeURIComponent(prompt)}`;
    const response = await axios.get(apiUrl);


    const images = response.data.result.slice(0, numImagesToShow);


    const cacheFolder = 'cache';
    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder);
    }


    const imgData = [];
    for (let index = 0; index < images.length; index++) {
      const image = images[index];
      const imageName = `image_${index + 1}.jpg`;
      const imagePath = path.join(cacheFolder, imageName);

      try {

        const imageResponse = await axios.get(image, { responseType: 'arraybuffer' });


        await fs.writeFile(imagePath, Buffer.from(imageResponse.data, 'binary'));


        imgData.push(imagePath);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }


    api.sendMessage({
      attachment: imgData.map(imgPath => fs.createReadStream(imgPath)),
      body: numImagesToShow + ' image results💫👇 ' + prompt
    }, event.threadID, (err) => {
      if (err) console.error("Error sending images:", err);


      imgData.forEach(imgPath => {
        fs.unlinkSync(imgPath);
      });
    });
  }
};