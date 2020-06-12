const Telegraf = require("telegraf");
const axios = require("axios");
const bot = new Telegraf("[INSERT TELEGRAM BOT TOKEN HERE]");

bot.command("start", ctx => {
    ctx.reply("Welcome, this is a simple bot that provides you the air temperature of the different regions in Singapore." + 
        "\nStart by doing /weather");
})

bot.command("weather", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Select a region", 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "North", callback_data: "north"}, {text: "South", callback_data: "south"}
                ], 
                [
                    {text: "West", callback_data: "west"}, {text: "East", callback_data: "east"}
                ]
            ]
        }
    })
})

bot.action("north", async ctx => {
    ctx.answerCbQuery();
    ctx.deleteMessage();
    try {
        let res = await axios.get("https://api.data.gov.sg/v1/environment/air-temperature");
        const northValue = res.data.items[0].readings[9].value;
        // console.log(res.data.items[0].readings[9].value);
        // console.log(res.data.metadata.stations);
        ctx.reply("Temperature in the North Region of Singapore is " + northValue + " degrees Celsius.");
    } catch(e) {
        console.log(e);
    }
})

bot.action("south", async ctx => {
    ctx.answerCbQuery();
    ctx.deleteMessage();
    try {
        let res = await axios.get("https://api.data.gov.sg/v1/environment/air-temperature");
        const southValue = res.data.items[0].readings[10].value;
        // console.log(res.data.items[0].readings[10].value);
        // console.log(res.data.metadata.stations);
        ctx.reply("Temperature in the South Region of Singapore is " + southValue + " degrees Celsius.");
    } catch(e) {
        console.log(e);
    }
}) 

bot.action("west", async ctx => {
    ctx.answerCbQuery();
    ctx.deleteMessage();
    try {
        let res = await axios.get("https://api.data.gov.sg/v1/environment/air-temperature");
        const westValue = res.data.items[0].readings[5].value;
        // console.log(res.data.items[0].readings[5].value);
        // console.log(res.data.metadata.stations);
        ctx.reply("Temperature in the West Region of Singapore is " + westValue + " degrees Celsius.");
    } catch(e) {
        console.log(e);
    }
}) 

bot.action("east", async ctx => {
    ctx.answerCbQuery();
    ctx.deleteMessage();
    try {
        let res = await axios.get("https://api.data.gov.sg/v1/environment/air-temperature");
        const eastValue = res.data.items[0].readings[12].value;
        // console.log(res.data.items[0].readings[12].value);
        // console.log(res.data.metadata.stations);
        ctx.reply("Temperature in the East Region of Singapore is " + eastValue + " degrees Celsius.");
    } catch(e) {
        console.log(e);
    }
}) 

// bot.command("test", async ctx => {
//     let res = await axios.get("https://api.data.gov.sg/v1/environment/air-temperature");
//     console.log(res.data.items[0]);
// })

bot.launch();
