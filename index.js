//Dependencies
const Puppeteer = require("puppeteer")
const Discord = require("discord.js")
const Is2 = require("is2")

//Variables
const Bot = new Discord.Client()

var Self = {
    prefix: ">",
    bot_token: ""
}

//Main
Bot.on("ready", ()=>{
    console.log("DisPwned is running.")
})

Bot.on("message", async(message)=>{
    const message_args = message.content.split(" ")

    if(message.content === `${Self.prefix}help`){
        const embed = new Discord.MessageEmbed()
        .setTitle("DisPwned | Help")
        .addField(">help", "Show DisPwned help menu.")
        .addField(">ispwned <email/phone number>", "Checks if the email/phone number is pwned.")
        .setColor("#0B1521")

        message.reply(embed)
    }else if(message_args[0] === `${Self.prefix}ispwned`){
        if(Is2.emailAddress(message_args[1]) || Is2.phoneNumber(message_args[1])){
            const browser = await Puppeteer.launch({ headless: false, args: ["--no-sandbox", "--disable-"] })
            const page = await browser.newPage()

            message.reply("Checking if the email/phone number is pwned, please wait.")
            await page.goto(`https://haveibeenpwned.com/unifiedsearch/${message_args[1]}`).then(async()=>{
                await browser.close()
                message.reply("The email/phone number is pwned.")
            }).catch(async()=>{
                await browser.close()
                message.reply("The email/phone number is not pwned.")
            })
        }else{
            message.reply("Invalid email/phone number.")
            return
        }
    }
})

Bot.login(Self.bot_token)
