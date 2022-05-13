const {
  WAConnection,
  MessageType,
  Presence,
  MessageOptions,
  Mimetype,
  WALocationMessage,
  WA_MESSAGE_STUB_TYPES,
  WA_DEFAULT_EPHEMERAL,
  ReconnectMode,
  ProxyAgent,
  GroupSettingChange,
  waChatkey,
  mentionedJid,
  processTime,
} = require('@adiwajshing/baileys')
const fs = require('fs')
const hx = require('hxz-api')
const axios = require("axios")
const crypto = require('crypto') 
const yts = require( 'yt-search')
const request = require('request')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const speed = require('performance-now')
const moment = require('moment-timezone')
const imageToBase64 = require('image-to-base64')
const { exec, spawn, execSync } = require('child_process')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const { y2mate } = require('./lib/y2mate');
const { wikiSearch } = require('./lib/wiki.js')
const { color, bgcolor } = require('./lib/color')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { y2mateA, y2mateV } = require('./lib/y2mate.js')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
gambar = fs.readFileSync('./media/logo2.jpg')
tamnel = fs.readFileSync('./media/logo.jpg')
td = fs.readFileSync('./media/TD.jpg')
const { Miminnya, BotName, fake, ownerNumber, targetpc, lolkey, Gopay, Dana, Pulsa} = require('./setting.json')
//const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, author, close,
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tebakgambar = JSON.parse(fs.readFileSync('./database/tebakgambar.json'))
const { audios } = require('./lib/audio.js')
const { donasi } = require('./lib/donasi.js')
let _premium = JSON.parse(fs.readFileSync('./database/user/premium.json'));
const premium = require("./lib/premium");
const ms = require('parse-ms')
const toMs = require('ms')
const regla = JSON.parse(fs.readFileSync('./database/reglas.json')) //lista de reglas grupales
const _bug = JSON.parse(fs.readFileSync('./database/bugs.json')) //lista de bugs
//const changes = JSON.parse(fs.readFileSync('./database/change.json')) //lista de cambios
const antilink = JSON.parse(fs.readFileSync('./lib/antilink.json'))
//const { version } = require('./lib/version')
const setting = JSON.parse(fs.readFileSync('./lib/settings.json'))
const dia = JSON.parse(fs.readFileSync('./database/horario.json'))
const bad = JSON.parse(fs.readFileSync('./database/badwords/bad.json'))
const BadWord = JSON.parse(fs.readFileSync('./database/badwords/BadWord.json'))
const google = require('google-it');
let event = JSON.parse(fs.readFileSync('./database/event/event.json'))




nocache('./database/change.json', module => console.log(`${module} Cambios Realizados con exito`))
function nocache(module, cb = () => { }) {
console.log('Modulo', `'${module}'`, 'ahora está visualizando los cambios')
fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module))
    cb(module)
})
}

function uncache(module = '.') {
return new Promise((resolve, reject) => {
    try {
        delete require.cache[require.resolve(module)]
        resolve()
    } catch (e) {
        reject(e)
    }
})
}

function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    //Add a zero in front of numbers<10
    min = checkTime(min);
    sec = checkTime(sec);
    var tempo = hr + " : " + min + " : " + sec;
    
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
	var time = setTimeout(function(){ startTime() }, 500);
}
/*****************************************************/
/******************Formato de dormir******************/
/*****************************************************/

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

/*****************************************************/
/******************Fecha y Hora***********************/
/*****************************************************/
var hoy = new Date();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
var fechaYHora = fecha + ' ' + hora;
/*****************************************************/
/*****************************************************/

audio1 = fs.readFileSync('./media/audio3/nyz1.m4a')
var argm = null
//================================================================================//
hit_today = []
isSelf = false
isPublic = false
a = ''
HardiApi = 'hardianto'
const apikey = setting.apikey 
const token_id = setting.token_id
prefix = setting.prefix
grupos = setting.grupos
dev = setting.dev
const compile = setting.compile
const rev = setting.rev
const webpag = setting.webpag
var meamasbot = null
/*async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}*/
//================================================================================//
         
function kyun(seconds){
          function pad(s){
          return (s < 10 ? '0' : '') + s;
          }
          var hours = Math.floor(seconds / (60*60));
          var minutes = Math.floor(seconds % (60*60) / 60);
          var seconds = Math.floor(seconds % 60);
          return `${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S`
          }

//================================================================================//
         
    module.exports = client = async (client, mek, _welkom) => {
        try {
    //const { id } = message
    if (!mek.hasNewMessage) return
    mek = mek.messages.all()[0]
    if (!mek.message) return
    if (mek.key && mek.key.remoteJid == 'status@broadcast') return
    if (mek.key.fromMe) return
    global.prefix
    global.blocked		
    mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    const content = JSON.stringify(mek.message)
    const from = mek.key.remoteJid
    const type = Object.keys(mek.message)[0]
    const { text, extendedText, contact, groupInviteMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
    const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    const wita = moment.tz('America/Bogota').format("HH:mm:ss")
    const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    const hour_now = moment().format('HH:mm:ss')
    const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
    body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
    budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
      const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()		
    const args = body.trim().split(/ +/).slice(1)
      const isCmd = body.startsWith(prefix)
    const q = args.join(' ')
      const botNumber = client.user.jid
      const botNumberss = client.user.jid + '@c.us'
      const isGroup = from.endsWith('@g.us')
    let sender = isGroup ? mek.participant : mek.key.remoteJid
      const isOwner = ownerNumber.includes(sender)
       const totalchat = await client.chats.all()
      const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
      const groupName = isGroup ? groupMetadata.subject : ''
       const groupId = isGroup ? groupMetadata.jid : ''
      const groupMembers = isGroup ? groupMetadata.participants : ''
      const groupDesc = isGroup ? groupMetadata.desc : ''
       const groupOwner = isGroup ? groupMetadata.owner : ''
      const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
       const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
      const isGroupAdmins = groupAdmins.includes(sender) || false        
      const isWelkom = isGroup ? _welkom.includes(from) : false
    const isAntiLink = isGroup ? antilink.includes(from) : false
    const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
    const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
    const isPremium = premium.checkPremiumUser(sender, _premium)
    let isEventon = isGroup ? event.includes(from) : false
    const mentionByTag = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.mentionedJid : []
    const mentionByreply = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.participant || "" : ""
//================================================================================//
         ///////////////////respuestas/////////////////
  mess = {
    wait: 'Por favor, espere. . .⚠',
    consultaG: 'Realizando tu busqueda de Google, espere. . .⚠',
    consultaY: 'Realizando tu busqueda de Youtube, espere. . .⚠',
    success: 'Successl!',
    wrongFormat: 'Wrong Format!! Please Read Menu!',
    error: {
      stick: 'This is not sticker',
      url: 'Url EROR',
    },
    only: {
      group: '[❗] Este comando es solo para grupos',
      owner: '[❗] Este comando solo puede ser utilizado por un Super Administrador',
      ownerG: '[❗] Este comando solo puede ser utilizado por un admin del grupo',
      ownerB: '[❗] Este comando solo lo usa los administradores del BOT',
      admin: '[❗] Este comando solo puede ser utilizado por administradores del grupo',
      Badmin: '[❗] Este comando solo se puede usar cuando el bot se convierte en administrador',
      attp: 'Calma crack estoy haciendo tu texto a sticker 👏\n\n*Esto puede demorar unos minutos*\n\n',
      imgs: 'Euu flaco 🥴\n\n*Convirtiendo tu Sticker a Imagen 🔄*\n\n',
      mpcancion: 'Calmaoooo estoy procesando 😎\n\n*Convirtiendo de MP4 a MP3 🔄*\n\n',
      mpa: 'Euu flaco 🥴\n\n*Estoy decargando tu cancion 🔄*\n\nAguarde un momento, por favor\n\n',
      xn: 'Calmao pa 😎\n\n*Estoy descargando tu video 🔄*\n\nAguarde un momento, por favor\n\n',
      mpv: 'Calma ✋🥸🤚\n\n*Estoy descargando tu video 🔄*\n\nAguarde un momento, por favor\n\n',
      insta: 'Calmao 😎\n\n*Estoy descargando tu post 🔄*\n\nAguarde un momento, por favor\n\n',
      musica: `Un momento estoy bucando tu canción 😎\n\n*Recuerda colocar bien el nombre de la cancion o el link del video de youtube❗*\n\n*Si el comando ${prefix}*play* no funciona utiliza el comando *${prefix}play2*, si no funciona utiliza el comando *${prefix}play3*`,
      activador: `Lo sentimos no podemos usar esta funcion debido a que no ha sido habilitada *(Contacte al Administrador del BOT)*`,
    }
  }
  
  const isUrl = (url) => {
      return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))        }
      const reply = (teks) => {
          client.sendMessage(from, teks, text, {quoted:mek})
      }
      const sendMess = (hehe, teks) => {
          client.sendMessage(hehe, teks, text)
      }
      const sendVn = (teks) => {client.sendMessage(from, teks, audio, {mimetype:"audio/mp4", ptt:true, quoted:mek,contextInfo: {forwardingScore: 508, isForwarded: true}})}
      
      const mentions = (teks, memberr, id) => {
          (id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
      }            
          
//================================================================================//
         
      const fakestatus = (teks) => {
      client.sendMessage(from, teks, text, {
      quoted: {
      key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
      },
      message: {
      "imageMessage": {
      "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
      "mimetype": "image/png",
      "caption": fake,
      "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
      "fileLength": "28777",
      "height": 1080,
      "width": 1079,
      "mediakey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
      "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
      "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
      "mediakeyTimestamp": "1610993486",
      "jpegThumbnail": gambar,
      "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
      }
      }
      }
      })
      }
      client.chatRead(from, "read")

//===============================================================================//
//+++ || FAKE KONTAK           
         const fkontak = { 
         key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `0@s.whatsapp.net` } : {}) }, message: { 'contactMessage': { 'displayName': `Hallo ${pushname}\n`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': gambar}}} 
//+++ || FAKE TROLI         
         const troli =  {key: { fromMe: false,remoteJid: "status@broadcast", participant: '0@s.whatsapp.net'}, message: {orderMessage: {itemCount: 2021, status: 200, thumbnail: gambar, surface: 200, message: `➥ Made By ${Miminnya}\n➥ Hallo ${pushname}`, orderTitle: 'LordPebri', sellerJid: '0@s.whatsapp.net'} } }                	

//=================================================//	

      const sendButton = async (from, context, fortext, but, mek) => {
      buttonMessages = {
      contentText: context,
      footerText: fortext,
      buttons: but,
      headerType: 1
      }
      client.sendMessage(from, buttonMessages, buttonsMessage, {
      quoted: troli
      })
      }
      const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
      const buttonMessage = {
      contentText: text1,
      footerText: desc1,
      buttons: but,
      headerType: 1,
      };
      client.sendMessage(
      id,
      buttonMessage,
      MessageType.buttonsMessage,
      options
      );
      };
      const sendButImage = async (from, context, fortext, img, but, mek) => {
      jadinya = await client.prepareMessage(from, img, image)
      buttonMessagesI = {
      imageMessage: jadinya.message.imageMessage,
      contentText: context,
      footerText: fortext,
      buttons: but,
      headerType: 4
      }
      client.sendMessage(from, buttonMessagesI, buttonsMessage, {
      quoted: troli,
      })
      }
      async function sendButLocation(id, text1, desc1, gam1, but = [], options = {}) {
      const buttonMessages = { locationMessage: { jpegThumbnail: gam1 }, contentText: text1, footerText: desc1, buttons: but, headerType: 6 }
      return client.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
      }          
      
//===============================================================================//
      const sendMedia = async(from, url, text="", mids=[]) =>{
              if(mids.length > 0){
              text = normalizeMention(from, text, mids)
              } 
              const fn = Date.now() / 10000;
              const filename = fn.toString()
              let mime = ""
              var download = function (uri, filename, callback) {
              request.head(uri, function (err, res, body) {
              
              request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
              });
              };
              download(url, filename, async function () {
              console.log('done');
              let media = fs.readFileSync(filename)
              let type = mime.split("/")[0]+"Message"
              if(mime === "image/gif"){
              type = MessageType.video
              mime = Mimetype.gif
              }
              if(mime.split("/")[0] === "audio"){
              mime = Mimetype.mp4Audio
              }
              client.sendMessage(from, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})                    
                  fs.unlinkSync(filename)
              });
              } 
       const sendMediaURL = async(to, url, text="", mids=[]) =>{
              if(mids.length > 0){
                  text = normalizeMention(to, text, mids)
              }
              const fn = Date.now() / 10000;
              const filename = fn.toString()
              let mime = ""
              var download = function (uri, filename, callback) {
                  request.head(uri, function (err, res, body) {
                      mime = res.headers['content-type']
                      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                  });
              };
              download(url, filename, async function () {
                  console.log('done');
                  let media = fs.readFileSync(filename)
                  let type = mime.split("/")[0]+"Message"
                  if(mime === "image/gif"){
                      type = MessageType.video
                      mime = Mimetype.gif
                  }
                  if(mime.split("/")[0] === "audio"){
                      mime = Mimetype.mp4Audio
                  }
                  client.sendMessage(to, media, type, { quoted: troli, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                  
                  fs.unlinkSync(filename)
              });
          }                                 
      const sendStickerFromUrl = async(to, url) => {
        var names = Date.now() / 10000;
        var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
         };
        download(url, './stik' + names + '.png', async function () {
        console.log('selesai');
        let filess = './stik' + names + '.png'
        let asw = './stik' + names + '.webp'
        exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
        let media = fs.readFileSync(asw)
        client.sendMessage(to, media, MessageType.sticker,{quoted:mek})
        fs.unlinkSync(filess)
        fs.unlinkSync(asw)
        });
        });
        }
      const sendFile = async (medya, namefile, capti, tag, vn) => {
        baper = await getBuffer(medya)
        mimi = ''
        if (namefile.includes('m4a')){
        client.sendMessage(from, baper, audio,{mimetype: 'audio/mp4',quoted: tag, filename: namefile, ptt: vn})
        }
        if (namefile.includes('mp4')){
        client.sendMessage(from, baper, video, {mimetype: 'video/mp4', quoted: tag, caption: capti, filename: namefile})
        }
        if (namefile.includes('gif')){
        client.sendMessage(from, baper, video, {mimetype: Mimetype.gif, caption: capti, quoted: tag, filename: namefile})
        } 
        if (namefile.includes('png')){
        client.sendMessage(from, baper, image, {quoted: tag, caption: capti, filename: namefile})
        }
        if (namefile.includes('webp')){
        client.sendMessage(from, baper, sticker, {quoted: tag})
        } else {
        kobe = namefile.split(`.`)[1]
        client.sendMessage(from, baper, document, {mimetype: kobe, quoted: tag, filename: namefile})
        }
        }
      const sendFileFromUrl = async(link, type, options) => {
        hasil = await getBuffer(link)
        client.sendMessage(from, hasil, type, options).catch(e => {
        fetch(link).then((hasil) => {
        client.sendMessage(from, hasil, type, options).catch(e => {
        client.sendMessage(from, { url : link }, type, options).catch(e => {
        reply('_[ ! ] Error failed to download and send media_')
        console.log(e)
         })
       })
       })
     })
    }
//================================================================================//

  colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
  const isMedia = (type === 'imageMessage' || type === 'videoMessage')
  const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
  const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
  const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
  const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
     
    if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m ✓ \x1b[1;37m]', color(pushname), 'use', color(command), 'args :', color(args.length))
    if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m ✓ \x1b[1;37m]', color(pushname), 'use', color(command), 'in group', color(groupName), 'args :', color(args.length))  
    if (!mek.key.fromMe && isSelf === true) return
    



//============================ Antilink ==============================//
  if (budy.includes("://chat.whatsapp.com/")){
    if (!isGroup) return
    if (!isAntiLink) return
    if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
    client.updatePresence(from, Presence.composing)
    var kic = `${sender.split("@")[0]}@s.whatsapp.net`
    reply(`Link Detectado ${sender.split("@")[0]} Usted será expulsado del grupo`)
    setTimeout( () => {
      client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
    }, 0)
    setTimeout( () => {
      client.updatePresence(from, Presence.composing)
      reply("Adios mi bro")
    }, 0)
  }

//================================================================================/
//============================ A L L  C A S E  M E N U ==============================
//================================================================================/
switch (command) {  
    case 'inicio':
          listMsg = {
          buttonText: 'Sistema Soporte y Aportes Menu\n',
          footerText: `\n${fake}`,
          description: `*Hola* @${sender.split('@')[0]},*Aqui encuentras el Menu*${'\n'}\n*Por ahora sigue en modo: ${dev}*\n*si no encuentran comandos activos es por que no han sido asignados*`,
          sections: [
          {
          rows: [
          {
            "title": "Comandos Administrador",
            "rowId": `${prefix}admincommands`
          },
          {
            "title": "Comandos Basicos",
            "rowId": `${prefix}bcommands`
          },
          {
            "title": "Chats de Grupo",
            "rowId": `${prefix}chats`
          },
          {
            "title": "Donaciones o Apoyo",
            "rowId": `${prefix}donacion`
          },
          {
            "title": "Informacion del sistema",
            "rowId": `${prefix}infosystem`
          },
          ]
          }],
          listType: 1
          }
          client.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]},quoted:mek})
          break

/*********************************************************************************/

//================================================================================/
//============================== Comandos Basicos ================================/
//================================================================================/
case 'bcommands':
listMsg = {
buttonText: 'Comandos Basicos\n',
footerText: `\n${fake}`,
description: `*Hola* @${sender.split('@')[0]},*Aqui encontraras los comandos basicos*${'\n'}\n*Por ahora sigue en modo: ${dev}*\n*si no encuentran comandos activos es por que no han sido asignados*`,
sections: [
{
rows: [
{
  "title": "Musica, Videos y Archivo MP3 🎵",
  "rowId": `${prefix}play`
},
{
  "title": "Videos de Tiktok",
  "rowId": `${prefix}tiktokdl`
},
{
  "title": "Para Buscar en Youtube🔍",
  "rowId": `${prefix}youtube`
},
{
  "title": "Stiker Emoji 😁",
  "rowId": `${prefix}emoji`
},
{
  "title": "Messeger Usuarios Activos 🧍‍♂️🧍‍♀️",
  "rowId": `${prefix}activos`
},
]
}],
listType: 1
}
client.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]},quoted:mek})
break
         
//================================================================================/
        case 'emoji':
            if (!isGroup) return reply(mess.only.group)
            if (!q) return reply(`Y el emoji a covertir en stiker usando,\n${prefix}emoji 😁`)
            qes = args.join(' ')
            reply(mess.wait)
            emoji.get(`${qes}`).then(emoji => {
            teks = `${emoji.images[4].url}`
              sendStickerFromUrl(from,`${teks}`)	
              console.log(teks)
              })
                  .catch((err) => {
            reply('Solo un emoji'); 
            })
            break
//================================================================================/
        case 'activos':
          if (!isGroup) return reply(mess.only.group)
          let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
          let online = [...Object.keys(client.chats.get(ido).presences), client.user.jid] 
          client.sendMessage(from, `*Grupo: ${groupName}*\n\n *Messenger Usuarios Activos :* \n` + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, { quoted: mek,  contextInfo: { mentionedJid: online }
          })
          break
//=================================================================================/
        case 'donacion':
          if (!isGroup) return reply(mess.only.group)
          tod = await getBuffer(`https://www.diariojuridico.com/wp-content/uploads/2021/08/donaciones-chile-diariojuridico.jpg`)
          client.sendMessage(from, tod, image, { quoted: mek, caption: '_*Tomate tu tiempo y donanos a nuestro paypal,*_\n*_te lo agradecemos con gusto_*\n\n*Donacion minima:*\n5 Dolares\n*Donacion Maxima:*\nLa que tu gustes\n\n_*-> https://www.paypal.me/malagons !!*_'})
          break     
//================================================================================/
//=========================== Informacion de Sistema =============================/
//================================================================================/
case 'infosystem':
if (!isGroup) return reply(mess.only.group)
listMsg = {
buttonText: 'Informacion del Sistema\n',
footerText: `\n${fake}`,
description: `Aqui encuentras la infomacion del BOT`,
sections: [
{
rows: [
{
  "title": "Estado Del Servicio",
  "rowId": `${prefix}status`
}
]
}],
listType: 1
}
client.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]},quoted:mek})
break

//================================================================================/
//================================ Funcion Chat ==================================/
//================================================================================/
case 'chats':
  listMsg = {
  buttonText: 'Chat de Telegram / Whatsapp\n',
  footerText: `\n${fake}`,
  description: `En que chat deseas buscar:`,
  sections: [
  {
  rows: [
  {
  "title": "Grupo Whatsapp",
  "rowId": `${prefix}linkw`
  }
  ]
  }],
  listType: 1
  }      
  client.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]},quoted:mek})
break
//================================================================================/
case 'linkw':
  client.updatePresence(from, Presence.composing) 
  if (!isGroup) return reply(mess.only.group)
  if (!isBotGroupAdmins) return reply(mess.only.Badmin)
  linkgc = await client.groupInviteCode (from)
  yeh = `*Usuario* @${sender.split('@')[0]},\n\n*https://chat.whatsapp.com/${linkgc}*\n\n*Link Del Grupo* *${groupName}*`
  client.sendMessage(from, yeh, text, {contextInfo: { mentionedJid: [sender]},quoted: mek, detectLinks: false})
break
//================================================================================/
//================================================================================/
//======================  Comandos Administrador  ================================/
//================================================================================/

case 'admincommands':
  if (!isOwner && !isGroupAdmins) return reply(mess.only.admin)
  if (!isGroup) return reply(mess.only.group)
  listMsg = {
  buttonText: 'Comandos de Administrador\n',
  footerText: `\n${fake}`,
  description: `\nSolo funcionan si eres un administrador\nen primer o segundo grado`,
  sections: [
  {
  rows: [
  {
    "title": "Activacion de Bienvenida",
    "rowId": `${prefix}bienvenida`
  },
  {
    "title": "Activacion de Antilink",
    "rowId": `${prefix}antiactive`
  },
  {
    "title": "Apertura o Cierre de Chat Grupal",
    "rowId": `${prefix}chatgrupo`
  },
  ]
  }],
  listType: 1
  }
  client.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]},quoted:mek})
  break

case 'bienvenida': 
  if (!isOwner && !isGroupAdmins) return reply(mess.only.admin)
  if (!isGroup) return reply(mess.only.group)
     listMsg = {
     buttonText: 'Activacion de la Bienvenida',
     footerText: `\n${fake}`,
     description: `Para activar la bienvenida debes seleccionar una Opcion`,
     sections: [
     {
     rows: [
     {
       "title": "Encendido",
       "rowId": `${prefix}welcome 1`
     },
     {
       "title": "Apagado",
       "rowId": `${prefix}welcome 0`
     }
     ]
     }],
     listType: 1
     }
     client.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]},quoted:mek})
     break

 case 'welcome':
        if (!isGroup) return reply(mess.only.group)
        if (!isOwner && !isGroupAdmins) return reply(mess.only.admin)
        if (!isGroupAdmins) return reply(mess.only.Badmin)
        if (args.length < 1) return reply('Para activar está funcion coloca *welcome 1')
        if (Number(args[0]) === 1) {
          if (isWelkom) return reply('Ya esta activada!!!')
          _welkom.push(from)
          fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welkom))
          reply('❬ ✅ ❭ La funcion de bienvenida esta habilitada en este grupo')
        } else if (Number(args[0]) === 0) {
          _welkom.splice(from)
          fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welkom))
          reply('❬ ❌ ❭ La funcion de bienvenida esta deshabilitada en este grupo')
        } else {
          reply('*Escribe el comando 1 para activarlo y 0 para desactivarlo* \n*Ejemplo:* *bienvenida 1*')
        }
        break


  case 'antiactive':
    if (!isOwner && !isGroupAdmins) return reply(mess.only.admin)
    listMsg = {
      buttonText: 'Activar y Desactivar Antilink',
      footerText: `\n${fake}`,
      description: `Para activar y desactivar debes seleccionar una Opcion`,
      sections: [
      {
      rows: [
      {
        "title": "Encendido",
        "rowId": `${prefix}antilink 0`
      },
      {
        "title": "Apagado",
        "rowId": `${prefix}antilink 1`
      },
      ]
      }],
      listType: 1
      }
      client.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]},quoted:mek})
      break

      case 'antilink': //-> Habilitar y Deshabilitar Antilink
        if (!isOwner && !isGroupAdmins) return reply(mess.only.admin)
        if (!isGroup) return reply(mess.only.group)
        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
        if (!isGroupAdmins) return reply(mess.only.Badmin)
        if (args.length < 1) return reply('Coloque *antimenu para ver los comandos')
        if (Number(args[0]) === 0) {
          if (isAntiLink) return reply('El antilink ya esta activo')
          antilink.push(from)
          fs.writeFileSync('./lib/antilink.json', JSON.stringify(antilink))
          reply('❬ ✅ ❭ *La funcion de antilink esta habilitada en este grupo*')
          client.sendMessage(from,`*Atención a todos los miembros de ${groupMetadata.subject}* 📣\n\n*El antilink esta activo*\n\nY solo los admins de este grupo podran pasar enlaces de grupo de whatsapp\n\nSi algun participante que no se admin envía un enlace a este grupo que no sea de interes u otro grupo sera expulsado de este grupo de inmediato
          \n\n*la funcion tambien tiene integrado un mensaje cuando se envia links de Google - Mega - Mediafire, pero  no es de expulsion*`, text)
        } else if (Number(args[0]) === 1) {
          antilink.splice(from)
          fs.writeFileSync('./lib/antilink.json', JSON.stringify(antilink))
          reply(`❬ ✅ ❭ La funcion de antilink esta deshabilitada en *${groupMetadata.subject}*`)
        } else {
          reply('Coloque *antimenu para ver los comandos')
        }
        break

  case 'info':
    if (!isGroup) return reply(mess.only.group)
    if (!isGroupAdmins) return reply(mess.only.admin)
    members_id = []
    no = 0
    teks = (args.length > 1) ? body.slice(6).trim() : ''
    teks += '\n\n'
    for (let mem of groupMembers) {
      no += 1
      teks += `[${no.toString()}] @${mem.jid.split('@')[0]}\n`
      members_id.push(mem.jid)
    }
    mentions(teks, members_id, true)
    break
//================================================================================/
//============================== D O W L O A D E R ===============================/
//================================================================================/
       case 'play':
          if (args.length < 1) return reply(`Envia el comando ${prefix}play y el link de youtube recortado`)
          reply(mess.wait)
          linkyt = `${args[0]}`
          fs.writeFileSync('./database/youtube/play2.json', JSON.stringify(linkyt))
          yta(`${(linkyt)}`)
          .then((res) => {
          const { dl_link, thumb, title} = res
          axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
          .then((a) => {
            const captions = `🍀 Musica encontrada con exito 🍀\n\n*☔Titulo* : ${title}\n\n¿Que deseas hacer?`
          sendMediaURL(from, thumb, captions)})})         
          listMsg = {
          buttonText: 'Que deseas Descargar 🔽 ',
          footerText: 'Soporte y Aportes V11',
          description: `Selecciona la opcion que desees:`,
          sections: [
          {
          rows: [
          {
            "title": "128 Kbps (El mas rapido)",
            },
          {
            "title": "🎵Audio MP4 Server",
            "rowId": `${prefix}musica-svr3`
            },
          {
            "title": "🎥Video MP4 Server",
            "rowId": `${prefix}video-svr3`
          },
          {
            "title": "🎵Archivo MP3 Server",
            "rowId": `${prefix}archivo-svr3`
          },
          {
            "title": "320 Kbps(El mas rapido)",
            },
          {
            "title": "🎵Audio MP4 Server 320 Kbps",
            "rowId": `${prefix}320`
            },
          {
            "title": "🎥Video MP4 Server 480p ",
            "rowId": `${prefix}480mp4`
          },
          {
            "title": "🎵Archivo MP3 Server",
            "rowId": `${prefix}320mp5`
          }
          ]
          }],
          listType: 1
          }
            await sleep(5000);
            client.sendMessage(from, listMsg, MessageType.listMessage, {quoted:mek})
          break
//================================================================================/
//                                Servidor local 1                                /
//================================================================================/
  case 'musica-svr3':
      reply(`*Aguarde estoy enviando el audio..*\n*Los audios muy pesados no seran enviados*`)
      if (args.length < 1)
          reply(mess.wait)
          ase = await y2mateA(`${(linkyt)}`).catch(e => {
          console.log(ase)
            reply('Erro🧸')
          })
          audio3 = await getBuffer(ase[0].link)
          await  client.sendMessage(from, audio3, audio, {mimetype: 'audio/mp4', filename: `${ase[0].output}`, quoted: mek})  
      break
//================================================================================/
  case 'video-svr3':
      reply(`*Aguarde estoy enviando el video..*\n*Los videos muy pesados no seran enviados*`)
      if (args.length < 1)
          reply(mess.wait)
          ase = await y2mateV(`${(linkyt)}`).catch(e => {
          console.log(ase)
            reply('Erro🧸')
          })
          video3 = await getBuffer(ase[0].link)
          await client.sendMessage(from, video3, video, {mimetype: 'video/mp4', filename: `${ase[0].output}`, quoted: mek})
          break
//================================================================================/        
  case 'archivo-svr3':
      reply(`*Aguarde estoy enviando el archivo de audio..*\n*Los audios muy pesados no seran enviados*`)
      if (args.length < 1)
          reply(mess.wait)
          ase = await y2mateA(`${(linkyt)}`).catch(e => {
          console.log(ase)
            reply('Erro🧸')
          })
          audiodoc = await getBuffer(ase[0].link)
          await client.sendMessage(from, audiodoc, document, {mimetype: 'audio/mp3', filename: `${ase[0].output}`, quoted: mek})  
      break
//================================================================================/
//                                Servidor Local 2                                /
//================================================================================/
  case '320':
      reply(mess.wait)
      yta(`${linkyt}`)
      .then((res) => {
      const { dl_link, thumb, title, filesize } = res
      axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
      .then((a) => {
        if (Number(filesize) >= 30000) return sendMediaURL(from, thumb, `*¡Datos obtenidos con éxito!*\n\n*Titulo* : ${title}\n*Ext* : MP3\n*Link* : ${a.data}\n\n_El archivo se está enviando_`)
        const captionsytmp3 = `*¡MP3 Encontrado!*\n\n*Titulo* : ${title}\n*Ext* : MP3\n\n_Usa el link para descargar tu audio_\n*Link* : ${a.data}\n`
        fs.writeFileSync('./database/youtube/data.json', JSON.stringify(a.data))
        sendMediaURL(from, thumb, captionsytmp3)
        sendMediaURL(from, dl_link)})})
        // audioHQ = await getBuffer(audiodl)
        // await client.sendMessage(from, audioHQ, audio, {mimetype: 'audio/mp4', quoted: mek})  
      break
//================================================================================/
case '480mp4':		
      reply(mess.wait)
      ytv(`${linkyt}`)
        .then((res) => {
        const { dl_link, thumb, title, filesize } = res
        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
        .then((a) => {
        if (Number(filesize) >= 40000) return sendMediaURL(from, thumb, `*YTMP 4!*\n\n*Titulo* : ${title}\n*Ext* : MP4\n*Link* : ${a.data}\n\n_El archivo se está enviando_`)
        const captionsYtmp4 = `*¡MP4 Encontrado!*\n\n*Titulo* : ${title}\n*Ext* : MP4\n\n_El archivo se está enviando, si no llega descarga por el link_\n${a.data}`
        sendMediaURL(from, thumb, captionsYtmp4)
        client.sendMessage(from,{url:`${a.data}`},video,{mimetype:'video/mp4', filename: `${title}.mp4`,quoted:mek})})})
      break
//================================================================================/
  case '320mp5':
      reply(mess.wait)
      yta(`${linkyt}`)
      .then((res) => {
      const { dl_link, thumb, title, filesize } = res
      axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
      .then((a) => {
        if (Number(filesize) >= 30000) return sendMediaURL(from, thumb, `*¡Datos obtenidos con éxito!*\n\n*Titulo* : ${title}\n*Ext* : MP3\n*Link* : ${a.data}\n\n_El archivo se está enviando_`)
        const captions = `*¡MP3 Encontrado!*\n\n*Titulo* : ${title}\n*Ext* : MP3\n\n_Usa el link para descargar tu audio_\n*Link* : ${a.data}\n`
        fs.writeFileSync('./database/youtube/data.json', JSON.stringify(a.data))
        sendMediaURL(from, thumb, captions)
        client.sendMessage(from,{url:`${a.data}`},document,{mimetype:'audio/mp4', filename: `${title}.mp3`,quoted:mek})})})
      break
//================================================================================/
//=============================== Buscadores ================================/
//================================================================================/
    case 'youtube': 
          if (args.length < 1) return reply('¿Qué estás buscando?')
          reply(mess.consultaY)
          ytsearch = await fetchJson(`https://api-team-of-hero.herokuapp.com/api/yt/search?apikey=apiteam&query=${body.slice(5)}`, {method: 'get'})
          console.log(ytsearch)
          if (ytsearch.error) return reply(mess.yterror)
          teks = '=================\n'
          for (let r of ytsearch.result){
          teks += `*titulo* : *${r.title}*\n*link* : *https://youtu.be/${r.videoId}*\n*Publicado* : *${r.ago}*\n*Duracion* : *${r.timestamp}*\n*Vistos* : *${r.views}*
          \n=================\n`
          }
          reply(teks.trim())
          break
//================================================================================/           
   case 'tiktokdl':
        if (args.length < 1) return reply(`Envia el comando ${prefix}tiktokdl y el link de tiktok`)
        if (!q) return reply('Link?')
        reply(mess.wait)
       hx.ttdownloader(`${args[0]}`)
       .then(result => {
       const { wm, nowm, audio } = result
       axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
       .then(async (a) => {
       me = `Tu video esta listo,Disfruta`
       client.sendMessage(from,{url:`${nowm}`},video,{mimetype:'video/mp4',quoted:mek,caption:me})
       })
     })
     break
//================================================================================/
//============================= M E D I A  M E N U ================================/
//================================================================================/
    case 'sticker': 
    case 'stiker': 
    case 's':
          if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
          const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
          const media = await client.downloadAndSaveMediaMessage(encmedia)
          ran = '666.webp'
          await ffmpeg(`./${media}`)
          .input(media)
          .on('start', function (cmd) {
          })
          .on('error', function (err) {
          console.log(`Error : ${err}`)
          fs.unlinkSync(media)
          reply('error')
          })
          .on('end', function () {
          client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
          fs.unlinkSync(media)
          fs.unlinkSync(ran)
          })
          .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
          .toFormat('webp')
          .save(ran)
          } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
          const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
          const media = await client.downloadAndSaveMediaMessage(encmedia)
          ran = '999.webp'
          reply(mess.wait)
          await ffmpeg(`./${media}`)
          .inputFormat(media.split('.')[1])
          .on('start', function (cmd) {
          })
          .on('error', function (err) {
          console.log(`Error : ${err}`)
          fs.unlinkSync(media)
          tipe = media.endsWith('.mp4') ? 'video' : 'gif'
          reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`)
          })
          .on('end', function () {
          client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
          fs.unlinkSync(media)
          fs.unlinkSync(ran)
          })
          .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
          .toFormat('webp')
          .save(ran)
          } else {
          reply(`Please send a picture or reply to an image with the caption ${prefix}sticker`)
          }
          break

//================================================================================/
//============================ A L L  F U N C T I O N ==============================/
//================================================================================/ 
      case 'global':
        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
        if (args.length < 1) return reply('*!Escribe el mensaje o envia la foto con el mensaje que deseas informar!*')
        anu = await client.chats.all()
        if (isMedia && !mek.message.videoMessage || isQuotedImage) {
          const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
          img = await client.downloadMediaMessage(encmedia)
          for (let _ of anu) {
            client.sendMessage(_.jid, img, image, {caption: `*[ Mensaje Administrador]*\n\n${body.slice(8)}`})
          }
          reply('*Transmisión Completada*')
        } else {
          for (let _ of anu) {
            sendMess(_.jid, `*[ Mensaje Administrador]*\n\n${body.slice(8)}`)
          }
          reply('*Transmisión Completada*')
        }
      break
//================================================================================/    
       case 'admins':
        if (!isGroup) return reply(mess.only.group)
        teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
          no = 0
          for (let admon of groupAdmins) {
          no += 1
          teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
          }
        mentions(teks, groupAdmins, true)
        break
//================================================================================/
//=================================== Reglas =====================================/
//================================================================================/           
        case 'reglas':
          if (!isGroup) return reply(mess.only.group)
          imgreglas = await getBuffer(`https://logos.flamingtext.com/Word-Logos/reglas-design-china-name.png`)
          let lrg = `*Politicas de Grupo*\n*total* : *${regla.length}*\n\n*Tenga en cuenta que si incumple una o varias, seras expulsado sin derecho a volver a entrar*`
          for (let y of regla) {
          lrg += `*->* *${y.replace(regla)}*\n\n`
          }
          client.sendMessage(from, imgreglas, image, { quoted: mek, caption : lrg } )
          //await reply(lrg) 
          break

        case 'addregla':
          if (!isOwner) return reply(mess.only.ownerB)
          if (!isGroupAdmins) return reply(mess.only.admin)
          if (args.length < 1) return reply( `Para agregar ${prefix}regla (texto de regla) . ejemplo: ${prefix}addregla (texto de regla)`)
          const rg = body.slice(10)
                          regla.push(rg)
          fs.writeFileSync('./database/reglas.json', JSON.stringify(regla))
          reply('*Éxito en agregar regla*')
          break

        case 'delregla':
          if (!isOwner) return reply(mess.only.ownerB)
          if (!isGroupAdmins) return reply(mess.only.admin)
          if (args.length < 1) return reply( `Para borrar ${prefix}regla (texto de regla). ejemplo: ${prefix}delregla (texto de regla)`)
          let drg = body.slice(10)
                         regla.splice(drg)
          fs.writeFileSync('./database/reglas.json', JSON.stringify(regla))
          reply('*Éxito en eliminar regla*')
          break
//=================================================================================/
//==============================  FUNCION DE PING =================================/
//=================================================================================/     
case 'status':  
if (!isOwner && !isGroupAdmins) return reply(mess.only.admin)
let i = []
let giid = []
for (mem of totalchat){
i.push(mem.jid)
}
for (id of i){
if (id && id.includes('g.us')){
giid.push(id)
}
}
let timestampi = speed();
let sepid = speed() - timestampi
var { device_manufacturer, device_model, mcc, mnc, os_version, os_build_number, wa_version  } = client.user.phone
anu = process.uptime()
runtem = `${kyun(anu)}`
imgserver = await getBuffer(`https://www.linkpicture.com/q/infoserver_1.jpg`)
//client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
client.sendMessage(from, imgserver, image, { quoted: mek, caption: `
╭────────••◈••───────╮
║	𝐈𝐧𝐟𝐨rmacion del Sistema
║⇢ *Arranco el:* ${fechaYHora}
║⇢𝐀𝐜𝐭𝐢𝐯𝐨 : ${runtem}
║⇢𝐏𝐫𝐞𝐟𝐢𝐱 : 「 ${prefix} 」
║⇢𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝐝𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 : ${wa_version}
║⇢𝐌𝐞𝐬𝐬𝐚𝐠𝐞𝐬 : *${hit_today.length}*
║⇢𝐂𝐡𝐚𝐭𝐬 : ${giid.length}
║⇢𝐆𝐫𝐮𝐩𝐨𝐬 : ${totalchat.length - giid.length}
║⇢𝐓𝐨𝐭𝐚𝐥 𝐝𝐞 𝐜𝐡𝐚𝐭𝐬 :${totalchat.length}
║⇢𝐑𝐀𝐌 : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
║⇢𝐕𝐞𝐥𝐨𝐜𝐢𝐝𝐚𝐝 : ${sepid.toFixed(4)} 𝐬𝐞𝐠𝐮𝐧𝐝𝐨𝐬
╰────────••◈••───────╯
`, text, })
break
//================================================================================/
//============================ A L L  F U N C T I O N ==============================/
//================================================================================/           
case 'chatgrupo':
listMsg = {
buttonText: '*apertura o cierre del chat*\n',
footerText: `\n${fake}`,
description: `Si deseas abrir solo indica:\nAbrir\nDe lo contrario\nCerrar`,
sections: [
{
rows: [
{
  "title": "Cerrar",
  "rowId": `${prefix}grupo f`
},
{
  "title": "Abrir",
  "rowId": `${prefix}grupo a`
}
]
}],
listType: 1
}
client.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]},quoted:mek})
break

case 'grupo':  
if (!isGroup) return reply(`Solo en grupos`)
if (!isGroupAdmins) return reply(`Necesitas ser Administrador`)
if (!isBotGroupAdmins) return reply(`BOT necesita ser Adminisrador`)
if (args[0] === 'a') {
await client.groupSettingChange(from, GroupSettingChange.messageSend, false)
reply(`Grupo abierto para todos concedido`)
} else if (args[0] === 'f') {
await client.groupSettingChange(from, GroupSettingChange.messageSend, true)
reply(`Grupo cerrado para todos concedido`)
}				 
break 
//*****************************************************************************************//           


//================================================================================/
//============================ E N D   F U N C T I O N ==============================/
//================================================================================/ 
default:

if (budy.startsWith('>')) {
console.log(color('[EVAL1]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval return`))
         try {
        let evaled = await eval(budy.slice(2))
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        reply(`${evaled}`)
          } catch (err) {
        reply(`${err}`)
          }
            } else if (budy.startsWith('x')) {
console.log(color('[EVAL2]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval identy`))
          try {
        return client.sendMessage(from, JSON.stringify(eval(budy.slice(2)), null, '\t'), text, { quoted: mek })
          } catch (err) {
        e = String(err)
        reply(e)
      }
    }
  }
  
} catch (e) {
  e = String(e)
  if (!e.includes("this.isZero") && !e.includes("jid")) {
console.log('Error : %s', color(e, 'red'))
      }
}
}