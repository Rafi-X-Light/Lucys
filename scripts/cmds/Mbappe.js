module.exports = {
	config: {
		name: "mbappe",
		aliases: ["mbappe"],
		version: "1.0",
		author: "Rafi_X_Ligjt",
		countDown: 5,
		role: 0,
		shortDescription: "send you pic of Mbappe",
		longDescription: "",
		category: "football",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ "https://i.postimg.cc/43MDwJQt/received-1102791960758289.jpg",

"https://i.postimg.cc/3N0zzz96/received-3706519149630328.jpg",

"https://i.postimg.cc/ZRd1M1wQ/received-1502340263948492.jpg",

"https://i.postimg.cc/mgVR3fnN/received-787260643207280.jpg",

"https://i.postimg.cc/rm7qd1PB/received-874806007715784.jpg",

"https://i.postimg.cc/T1vZMCS3/received-874839834184795.jpg",

"https://i.postimg.cc/VksPkZNS/received-905570741198084.jpg",

"https://i.postimg.cc/cHtWwFPs/images-3.jpg",

"https://i.postimg.cc/43mRR8fz/images-4.jpg",

"https://i.postimg.cc/4yCg5zTp/images-5.jpg",

 "https://i.postimg.cc/13RZJmb7/images-6.jpg",

"https://i.postimg.cc/6pHxSsXW/images-7.jpg",

"https://i.postimg.cc/6QgJWdqF/images-8.jpg",

"https://i.postimg.cc/6QgJWdqF/images-8.jpg",

"https://i.postimg.cc/Dzw6jZQZ/3a1ec104a965479654e7bd18f5da33c6.jpg",

"https://i.postimg.cc/rwJgNWr3/download.jpg",

"https://i.postimg.cc/zDgjP4hn/images-10.jpg",


"https://i.postimg.cc/N0C4Wcbx/f83767418e0ba220439b671bb4833c31.jpg",

"https://i.postimg.cc/GhvX96hc/images-11.jpg",
 
"https://i.postimg.cc/FFMPrhvW/images-12.jpg",

"https://i.postimg.cc/zBLjNccY/images-9.jpg",

"https://i.postimg.cc/kX31y72r/images-13.jpg",

"https://i.postimg.cc/3x9t7pn7/images-14.jpg",

"https://i.postimg.cc/QdjfRSg0/images-15.jpg",

"https://i.postimg.cc/W43X43HZ/images-16.jpg"
]

let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '「 Best Player Of New Generation ⚽」',attachment: await global.utils.getStreamFromURL(img)
})
}
     }