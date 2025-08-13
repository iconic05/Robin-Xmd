const fs = require('fs')
const chalk = require('chalk')



global.ig = 'https://wa.me/263714388643'
global.ytname = 'YT: https://www.youtube.com/@iconic-tech'
global.owner = ['2347076945585']
global.ownernomer = '263714388643'
global.socialm = 'GitHub: https://github.com/iconic05'
global.location = 'Zimbabwe' 

//==================SETTING BOT===========================\\
global.botname = "𝐊𝐈𝐍𝐆 𝐑𝐎𝐁𝐈𝐍 𝐗𝐌𝐃"
global.codewave = "codewave-unit.zone.id"
global.ownernumber = '263714388643'
global.botnumber = '263714388643'
global.ownername = 'ɪᴄᴏɴɪᴄ ᴛᴇᴄʜ'
global.ownerNumber = ["263714388643@s.whatsapp.net"]
global.themeemoji = '🎲'
global.wm = "ᴅᴇᴠ ɪᴄᴏɴɪᴄ ᴛᴇᴄʜ"
global.creator = "263714388643@s.whatsapp.net"
global.packname = "𝐑𝐎𝐁𝐈𝐍 𝐗𝐌𝐃"
global.author = "𝐑𝐎𝐁𝐈𝐍 𝐗𝐌𝐃"

//const them
global.themeemoji = '🎲'
//custom prefix
global.prefa = ['','!','.','#','&']

//false=disable and true=enable
global.anticall = true; //default state of this feature
global.chatbot = true; //* Enable text chatbot
global.autoremove = false
global.autowelcome = true
global.autoRecording = false //auto recording
global.autoTyping = false //auto typing
global.autorecordtype = false //auto typing + recording
global.autoread = false //auto read messages
global.autobio = true //auto update bio
global.anti92 = false //auto block +92 
global.autoswview = false //auto view status/story

//menu type 
//v1 is image menu, 
//v2 is link + image menu,
//v3 is video menu,
//v4 is call end menu
global.typemenu = 'v1'

//REPLY MESSAGES
global.mess = {
    done: 'DONE!',
    prem: 'This feature can be used by premium user only',
    admin: 'This feature can be used by admin only',
    botAdmin: 'This feature can only be used when the bot is a group admin ',
    owner: 'This feature can be used by owner only',
    group: 'This feature is only for groups',
    private: 'This feature is only for private chats',
    wait: 'In process.. ',    
    error: 'Error!',
}

global.thumb = fs.readFileSync('./robinmedia/robin.jpg')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})