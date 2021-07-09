const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { changes } = require('./src/changes')
const { menumusic } = require('./src/menumusic')
const { musirules } = require('./src/musirules')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const wmusica = JSON.parse(fs.readFileSync('./src/wmusica.json')) //añadida entrada para grupo de musica
const result = JSON.parse(fs.readFileSync('./src/result.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
const Blocklist = JSON.parse(fs.readFileSync('./src/blocked.json'))
const bad = JSON.parse(fs.readFileSync('./src/bad.json'))
const BadWord = JSON.parse(fs.readFileSync('./src/BadWord.json'))
const { tmpdir } = require("os");
const path = require("path");
const streamifier = require("streamifier");
const axios = require("axios");
const Crypto = require("crypto");
const request = require('request');
const google = require('google-it');
//Añadida entrada de OWNER //
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Admin JDMTECH SyA\n' 
            + 'ORG: Soporte y Aportes Community;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=573144182071:+57 314-418-2071\n' 
            + 'END:VCARD' 
const ownerNumber = ["573144182071@s.whatsapp.net","573144182071@s.whatsapp.net"] 
prefix = setting.prefix
blocked = []   

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('Escanea el codigo QR generado antes de continuar...'))
	})

	fs.existsSync('./sessionQR.json') && client.loadAuthInfo('./sessionQR.json')
	client.on('connecting', () => {
		start('2', 'Conectando...')
	})
	client.on('open', () => {
		success('2', 'Conectado.')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./sessionQR.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	
	//mensaje de bienvenida del grupo musical usando el comando bienvenidamusical
	client.on('group-participants-update', async (anu) => { 
		if (!wmusica.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.pinimg.com/236x/e8/b0/d2/e8b0d26658598ea5a192b8d777d7e691.jpg'
				}
				teks = `Hola @*${num.split('@')[0]}*\nTe damos la bienvenida a *${mdata.subject}*\nespero que el grupo sea de tu agrado.☺, para usar el bot debes escribir *#menumusica*`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'http://pa1.narvii.com/6412/fe4648f79f54789195ace50a4650a7cfc0c7f8b0_00.gif'
				}
				teks = `Despidamos a el soldado \n lo sentimos muchos y que tengas buen dia. @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	//final de la funcion


	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apikey = setting.apikey //el codigo lo puedes consegir consultando al admin
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Bogota').format('DD/MM HH:mm:ss') //cambio de Zona horaria
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '⌛ *En proceso, tardara un momento...* ⌛',
				download: '⌛ *Descargando, espere un momento...* ⌛',
				YoutubeSH: ' *Consultando en Youtube, espere...* ',
				success: '✔️ *Completado* ✔️',
				qr: '⌛ *Generando QR, un momento...* ⌛',
				error: {
					stick: '❌ *Falló, se produjo un error al convertir la imagen en un sticker* ❌',
					Iv: '❌ *Enlace inválido* ❌',
					foto: '❌ *¿Y la  foto?* ❌',
					translate: '❌ *No es posible traducir este texto* ❌',
					fail: '❌ *Enlace inválido o Fallo en descarga* ❌'
				},
				only: {
					group: '❌ *¡Este comando solo se puede usar en grupos!* ❌',
					ownerG: '❌ *¡Este comando solo puede ser utilizado por el grupo propietario!* ❌',
					ownerB: '❌ *¡Este comando solo puede ser utilizado por el bot propietario!* ❌',
					admin: '❌ *¡Este comando solo puede ser utilizado por administradores de grupo!* ❌',
					Badmin: '❌ *¡Este comando solo se puede usar cuando el bot se convierte en administrador!* ❌'
				}
			}
			const totalchat = await client.chats.all()
			const speed = require('performance-now');
			//const isEventon = isGroup ? evento.includes(from) : false
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const botNumber = client.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkomusic = isGroup ? wmusica.includes(from) : false
			const isbad = isGroup ? bad.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isresult = isGroup ? result.includes(from) :false
			const isBadWord = isGroup ? BadWord.includes(from) : false
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
			
			function addMetadata(packname, author) {	
				if (!packname) packname = 'bot-s&a'; if (!author) author = 'Bot-s&a';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	


			}

			//Funcion de Malas Palabras
			if (isGroup && isBadWord) {
				if (bad.includes(messagesC)) {
					if (!isGroupAdmins) {
						try { 
							reply("*Cuida lo que dices!!😠*")
							setTimeout( () => {
									var ban = `${sender.split("@")[0]}@s.whatsapp.net`
									client.groupRemove(from, [ban]).catch((e)=>{reply(`*ERR:* ${e}`)})
								}, 5000)
									setTimeout( () => {
									client.updatePresence(from, Presence.composing)
									reply("*1 segundos*")
								}, 4000)
									setTimeout( () => {
									client.updatePresence(from, Presence.composing)
									reply("*2 segundos*")
								}, 3000)
									setTimeout( () => {
									client.updatePresence(from, Presence.composing)
									reply("*3 segundos*")
								}, 2000)
									setTimeout( () => {
									client.updatePresence(from, Presence.composing)
									reply("*4 segundos*")
								}, 1000)
									setTimeout( () => {
									client.updatePresence(from, Presence.composing)
									reply("*Te pateare por ser grosero!*")
								}, 0)
							} catch { client.sendMessage(from, `*Afortunadamente no soy un administrador, si soy administrador ya valiste, ¡banamex!*`, text , {quoted : mek}) }
					} else {
						return reply( "*Por favor, cuidate de mi 😇*")
					}
				}
			}
			//Fin de la estructura

				/*[-- function antilink --]*/
				if (messagesC.includes("://chat.whatsapp.com/")){
					if (!isGroup) return
					if (isGroupAdmins) return reply('porque eres el administrador del grupo, el bot no te echará')
					client.updatePresence(from, Presence.composing)
					if (messagesC.includes("#izinadmin")) return reply("#permiso aceptado")
					var kic = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Enlace de grupo detectado lo siento ${sender.split("@")[0]} Serás expulsado del grupo en 5 segundos.`)
						setTimeout( () => {
						client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}, 5000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("1 Segundos")
					}, 4000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("2 Segundos")
					}, 3000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("3 Segundos")
					}, 2000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("4 Segundos")
					}, 1000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("5 Segundos")
					}, 0)
				}

			switch(command) {

				//Funcion de espacio en blanco
				case 'cleanchat':
					if (!isGroupAdmins) return reply(mess.only.admin)
					client.sendMessage(from, espaciochat(prefix), text)
					break
				//Fin de la estructura

				//menu de grupo de musica
				case 'menumusica':
				case 'menumusic':
					
					musicalogo = await getBuffer(`https://iosmac.es/wp-content/uploads/2014/08/tumblr_static_whatsappsmall2-copia.jpg`)
					client.sendMessage(from, musicalogo, image, { quoted: mek, caption : menumusic(prefix), text} )
					break
				//Fin de la estructura

				//Reglas del grupo musical
                case 'musireglas':
					if (!isGroup) return reply(mess.only.group)
                    imgreglas = await getBuffer(`https://www.e-comex.com/wp-content/uploads/2017/02/Mano1-300x137.png`)
					client.sendMessage(from, imgreglas, image, { quoted: mek, caption : musirules(prefix), text} )
                    break
				//Fin de la estructura

				//Registro de cambios
				case 'cambios':
					if (!isGroup) return reply(mess.only.group)
					
                    cambio = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnaUXekAfQBUgkpLEeCJwLwcYhfervVVAmQ&usqp=CAU`)
					client.sendMessage(from, cambio, image, { quoted: mek, caption : changes(prefix), text} )
                    break
				//Fin de la estructura

				//Area de los datos del Administrador (se puede cambiar)
				case 'creador':
					
                  	client.sendMessage(from, {displayname: "JDMTECH", vcard: vcard}, MessageType.contact, { quoted: mek})
					client.sendMessage(from, '_*Este es mi propietario. No olvides cualquier inquietud con el admin ...*_',MessageType.text, { quoted: mek})
                	break
				//Fin de la estructura

				//Area de los datos del Administrador (se puede cambiar)
				case 'donacion':
					tod = await getBuffer(`https://panels-images.twitch.tv/panel-186289434-image-fa8908d1-9ee5-45d5-8406-72d3b9804cd4`)
					client.sendMessage(from, tod, image, { quoted: mek, caption: '_*Tomate tu tiempo y donanos a nuestro paypal, te lo agradeceremos con gusto ->  https://www.paypal.me/malagons !!*_'})
					break
				//Fin de la estructura

				//Estado de actividad del bot 
				case 'status':
                    const timestamp = speed();
                    const latensi = speed() - timestamp
                    client.updatePresence(from, Presence.composing) 
					uptime = process.uptime()
					imgserver = await getBuffer(`https://yt3.ggpht.com/a-/AAuE7mDmtUNTELszsWCyDdH7NR2SS1GVmsSvsshW-Q=s240-mo-c-c0xffffffff-rj-k-no`)
       				client.sendMessage(from, imgserver, image, { quoted: mek, caption: `Tiempo Respuesta: *${latensi.toFixed(2)} _Segundos_*\nSistema Operativo: *Windows Server 2019*\nRAM: *2GB*\nRed: *1GB*\nStatus: *Online*\nEjecutado en: *Visual Studio + Node*\nEn desarrollo: *Apagado*\n\n*El bot esta activo*\n*${kyun(uptime)}*`, text, })
                    break
				//Fin de la estructura

				//Funcion de cambio de foto de perfil
				case 'fotogrupo': 
					reply(mess.wait)
					if (!isOwner) return reply(mess.only.ownerB)
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    media = await client.downloadAndSaveMediaMessage(mek)
                    await client.updateProfilePicture (from, media)
                    reply('*Cambio de foto de grupo completo✔️*')
                break						
				//Fin de la estructura
				
				//Funcion de Cambio de Nombre y Descripcion
				case 'cambionm':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					client.groupUpdateSubject(from, `${body.slice(10)}`)
					client.sendMessage(from, '*Hecho, Cambio de Nombre del Grupo✔️*', text, {quoted: mek})
					break

				case 'cambiodc':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					client.groupUpdateDescription(from, `${body.slice(10)}`)
					client.sendMessage(from, '*Hecho, Cambio de Descripcion del Grupo✔️*', text, {quoted: mek})
					break
				//Fin de la estructura

				//funcion de enviar texto a audio
				case 'tts':
					if (args.length < 1) return client.sendMessage(from, '¿Dónde está el código de idioma?', text, {quoted: mek})
					const gtts = require('./lib/tts')(args[0])
					if (args.length < 2) return client.sendMessage(from, '¿Dónde está el texto?', text, {quoted: mek})
					dtt = body.slice(7)
					ranm = getRandom('.mp3')
					dtt.length > 1800
					? reply('La mayor parte del texto')
					: gtts.save(ranm, dtt, function() {
						client.sendMessage(from, fs.readFileSync(ranm), audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
						fs.unlinkSync(ranm)
					})
					break	
				//Fin de la estructura

				//Funcion de cambio de prefijo de bot
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					setting.prefix = prefix
					fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
					reply(`El prefijo se ha cambiado correctamente a : ${prefix}`)
					break
				//Fin de la estructura
				
				//En caso de no funcionar youtube Download usar este codigo	
					
				case 'mp3':  //Añadido de JDMTECH Principal
                    if (args.length < 1) return reply('Y el url de youtube?')
					reply(mess.download)
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.wrogf())
					anu = await fetchJson(`https://api.zeks.xyz/api/ytmp3?apikey=${apikey}&url=${args[0]}`, {method: 'get'})  //modificaciones de JDMTECH
					if (anu.error) return reply(mess.error.fail)
					thumbnail = await getBuffer('https://es.seaicons.com/wp-content/uploads/2015/10/Windows-Media-Player-icon.png')
					teks = `*Titulo* : *${anu.result.title}*\n*Peso* : ${anu.result.size}\n*Descarga* : *${anu.result.url_audio}*`
					client.sendMessage(from, thumbnail, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result.url_audio)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: mek})
					break
					
				case 'mp4':  //Añadido de JDMTECH Principal
					if (args.length < 1) return reply('Y el url de youtube?')
					reply(mess.download)
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.stikga())
					anu = await fetchJson(`https://api.zeks.xyz/api/ytmp4?apikey=${apikey}&url=${args[0]}`, {method: 'get'}) //modificaciones de JDMTECH
					if (anu.error) return reply(mess.error.fail)
					thumbnail = await getBuffer('https://es.seaicons.com/wp-content/uploads/2015/10/Windows-Media-Player-icon.png')
					teks = `*Titulo* : *${anu.result.title}*\n*tamaño* : ${anu.result.size}\n*Descarga* : ${anu.result.url_video}`
					client.sendMessage(from, thumbnail, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result.url_video)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.result.title}.mp4`, quoted: mek})
					break
				
				case 'dlmp3': //Añadido by JDMTECH Secundario
					if (args.length < 1) return reply('Y el url de youtube?')
					reply(mess.download)
					mp3 = await fetchJson(`https://api.zeks.xyz/api/ytmp3/2?apikey=${apikey}&url=${args[0]}`, {method: 'get'})
					if (mp3.error) return reply(mess.error.fail)
					thumb = await getBuffer('https://es.seaicons.com/wp-content/uploads/2015/10/Windows-Media-Player-icon.png')
					teks = `*Titulo* : ${mp3.result.title}\n*Tamaño* : ${mp3.result.size}\n*Calidad* : ${mp3.result.quality}\n*Por este enlace puedes bajar el audio* : ${mp3.result.link}`
					client.sendMessage(from, thumb, image,{quoted: mek, caption: teks})
					buffer = await getBuffer(mp3.result.link)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${mp3.result.title}.mp3`, quoted: mek})
					break
					
				case 'dlmp4': //Añadido by JDMTECH Secundario
					if (args.length < 1) return reply('Y el url de youtube?')
					reply(mess.download)
					mp4 = await fetchJson(`https://api.zeks.xyz/api/ytmp4/2?apikey=${apikey}&url=${args[0]}`, {method: 'get'})
					if (mp4.error) return reply(mess.error.fail)
					thumbnail = await getBuffer('https://es.seaicons.com/wp-content/uploads/2015/10/Windows-Media-Player-icon.png')
					teks = `Titulo : *${mp4.result.title}*\nTamaño : *${mp4.result.size}*\nCalidad : *${mp4.result.quality}*\nPor este enlace puedes bajar el video : *${mp4.result.link}*`
					client.sendMessage(from, thumbnail, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(mp4.result.link)
 					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${mp4.result.title}.mp4`, quoted: mek, caption: 'Disfruta tu video :)'})
					break

				case 'bkmp3': //Añadido by JDMTECH Backup
					if (args.length < 1) return reply('Y el url de youtube?')
					reply(mess.download)
					mp3 = await fetchJson(`http://hadi-api.herokuapp.com/api/ytaudio?url=${args[0]}`, {method: 'get'})
					if (mp3.error) return reply(mess.error.fail)
					thumb = await getBuffer('https://es.seaicons.com/wp-content/uploads/2015/10/Windows-Media-Player-icon.png')
					teks = `*Titulo* : *${mp3.result.title}*\n*Descarga* : ${mp3.result.download_audio}`
					client.sendMessage(from, thumb, image,{quoted: mek, caption: teks})
					buffer = await getBuffer(mp3.result.download_audio)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${mp3.result.title}.mp3`, quoted: mek})
					break
					
				case 'bkmp4': //Añadido by JDMTECH Backup
					if (args.length < 1) return reply('Y el url de youtube?')
					reply(mess.download)
					mp4 = await fetchJson(`http://hadi-api.herokuapp.com/api/ytvideo?url=${args[0]}`, {method: 'get'})
					if (mp4.error) return reply(mess.error.fail)
					thumbnail = await getBuffer('https://es.seaicons.com/wp-content/uploads/2015/10/Windows-Media-Player-icon.png')
					teks = `Titulo : *${mp4.result.title}*\n*Descarga* : ${mp3.result.download_video}`
					client.sendMessage(from, thumbnail, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(mp4.result.download_video)
 					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${mp4.result.title}.mp4`, quoted: mek, caption: 'Disfruta tu video :)'})
					break
	
				case 'soundcloud': //Añadido by JDMTECH 
					if (args.length < 1) return reply('Y el url de soundcloud?')
					reply(mess.download)
					soundc = await fetchJson(`https://api.zeks.xyz/api/soundcloud?apikey=${apikey}&url=${args[0]}`, {method: 'get'})
					thumbnail = await getBuffer('https://es.seaicons.com/wp-content/uploads/2015/10/Windows-Media-Player-icon.png')
					teks = `Titulo : *${soundc.result.title}*\nDuracion : *${soundc.result.duration}*\nCalidad : *${soundc.result.quality}*\nPor este enlace puedes bajar el video : *${soundc.result.download}*`
					client.sendMessage(from, thumbnail, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(soundc.result.download)
 					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${soundc.result.title}.mp3`, quoted: mek, caption: 'Disfruta :)'})
					break

				case 'jxbuscar':
					if (args.length < 1) return reply('¿Qué estás buscando?')
					reply(mess.wait)
					x = await fetchJson(`https://api.zeks.xyz/api/joox?apikey=${apikey}&q=${body.slice(5)}`, { method: 'get' })
					teks = '「 *_JOOX MP3_* 」\n'
					for (let data of x.data){
					teks += `\n❏ *Titulo* : ${data.judul}\n❏ *Artista* : ${data.artist}\n❏ *Album* : ${data.album}\n❏ *Tamaño* : ${data.size}\n❏ *Descargar Audio Link* : ${data.audio}\n\n`
					}
					reply(teks.trim())
					break

				case 'dlaudio':
					if (args.length < 1) return reply('¿link de descarga joox?')
					reply(mess.wait)
					jox = await getBuffer(`${args[0]}`)
					client.sendMessage(from, jox, audio, {mimetype: 'audio/mp4', filename: `${jox}.mp3`, quoted: mek, caption: 'Disfruta :)'})
					break

				case 'ytbuscar': //Añadido by JDMTECH 
					if (args.length < 1) return reply('¿Qué estás buscando?')
					reply(mess.YoutubeSH)
					ytsearch = await fetchJson(`https://api.zeks.xyz/api/yts?apikey=${apikey}&q=${body.slice(5)}`, {method: 'get'})
					if (ytsearch.error) return reply(ytsearch.error)
					teks = '=================\n'
					for (let r of ytsearch.result){
					teks += `*titulo* : *${r.video.title}*\n*link* : *https://youtu.be/${r.video.id}*\n*Publicado* : *${r.video.upload_date}*\n*Duracion* : *${r.video.duration}*\n*Vistos* : *${r.video.views}*
					\n=================\n`
					}
					reply(teks.trim())
					break
				//Fin de la estructura
					
				//Funciones Grupales
				case 'tagall':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					no = 0
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						no += 1
						teks += `[${no.toString()}] @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
					
				case 'admins':
					if (!isGroup) return reply(mess.only.group)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
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
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
                     
				case 'clearall':
					if (!isOwner) return reply('¿Quién es usted?')
					anu = await client.chats.all()
					client.setMaxListeners(30)
					for (let _ of anu) {
					client.deleteChat(_.jid)
					}
					reply('eliminar todo el chat completado :) ')
					break
					
				case 'gb': //mensaje global, solo permitido a los administradores  //Añadido by JDMTECH 
					if (!isOwner) return reply('¿Quién es usted?')
					if (args.length < 1) return reply('*!Escribe el mensaje o envia la foto con el mensaje que deseas informar!*')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						img = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, img, image, {caption: `*[ Mensaje Administrador ]*\n\n${body.slice(4)}`})
						}
						reply('*Transmisión Completada*')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*[ Mensaje Administrador ]*\n\n${body.slice(4)}`)
						}
						reply('*Transmisión Completada*')
					}
					break
                
				case 'promover':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Promover el éxito\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Haz sido promovido  @${mentioned[0].split('@')[0]} ¡Como administrador de grupo!, Felicidades 😄 `, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
					
				case 'degradar':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Degradar con éxito\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Por tu falta de compromiso @${mentioned[0].split('@')[0]} te hemos quitado de la administracion del grupo, Lo sentimos ☹️`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
					
				case 'añadir':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('¿Quieres agregar un numero? añadelo sin espacios y recuerda el indicativo pais sin el simbolo +?')
					if (args[0].startsWith('00')) return reply('Utilice el código de país')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('No se pudo agregar el destino, tal vez porque es privado')
					}
					break
					
				case 'ban':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('¡La etiqueta objetivo que quieres eliminar!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Órdenes recibidas, emitidas :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`La orden fue recibida, emitida: @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
					
				
					
                case 'linkgrupo': //link de el grupo 
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    linkgc = await client.groupInviteCode(from)
                    reply('https://chat.whatsapp.com/'+linkgc)
                    break
					
                case 'leave':
                    if (!isGroup) return reply(mess.only.group)
                    if (isGroupAdmins || isOwner) {
                    client.groupLeave(from)
                    } else {
                    reply(mess.only.admin)
                    }
                    break
								
				case 'cerrarchat': //Añadido by JDMTECH
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var nomor = mek.participant
					const close = {
					text: `Grupo cerrado por administrador @${nomor.split("@s.whatsapp.net")[0]}\nahora *Solo los administradores* puede enviar mensajes`,
					contextInfo: { mentionedJid: [nomor] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
					break
                
				case 'abrirchat': //Añadido by JDMTECH
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					open = {
					text: `Grupo abierto por el administrador @${sender.split("@")[0]}\nahora *todos los participantes* pueden enviar mensajes`,
					contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, false)
					client.sendMessage(from, open, text, {quoted: mek})
					break
				//Fin de la estructura
								
				//Funcion de Bienvenida Musical 
				case 'bienvenidamusical': //Añadido by JDMTECH para grupo de musicas 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
					wmusica.push(from)
					fs.writeFileSync('./src/wmusica.json', JSON.stringify(wmusica))
					reply('Activó con éxito la función de bienvenida en este grupo ✔️')
					} else if (Number(args[0]) === 0) {
					wmusica.splice(from, 1)
					fs.writeFileSync('./src/wmusica.json', JSON.stringify(wmusica))
					reply('Desactivado con éxito la función de bienvenida en este grupo ✔️')
					} else {
					reply('1 para activar, 0 para desactivar')
					}
                    break	
				//Fin de la estructura

				//Entrada de malas palabras
				case 'groserias':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
					BadWord.push(from)
					fs.writeFileSync('./src/BadWord.json', JSON.stringify(BadWord))
					reply('*Malas Palabras está habilitada* ✔️')
					} else if (Number(args[0]) === 0) {
					BadWord.splice(from, 1)
					fs.writeFileSync('./src/BadWord.json', JSON.stringify(BadWord))
					reply('*Malas Palabras está deshabilitada* ✔️')
					} else {
					reply('1 para activar, 0 para desactivar')
					}
					break	
					
				case 'listagrosera':
					let lbw = `*Esta es una lista de MALAS PALABRAS*\n*Total* : *${bad.length}*\n\n`
					for (let i of bad) {
					lbw += `*┣⊱* *${i.replace(bad)}*\n`
					}
					await reply(lbw)
					break

				case 'addpalabra':
					if (!isOwner) return reply(mess.only.ownerB)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply( `órdenes de envío ${prefix} agregar mala palabra[insultos]. ejemplo: ${prefix}addpalabra idiota`)
					const bw = body.slice(12)
                    bad.push(bw)
					fs.writeFileSync('./src/bad.json', JSON.stringify(bad))
					reply('*Éxito en agregar mala palabra!*')
					break

				case 'delpalabra':
					if (!isOwner) return reply(mess.only.ownerB)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply( `órdenes de envío ${prefix}addnotoxic [insultos]. ejemplo: ${prefix}delpalabra idiota`)
					let dbw = body.slice(12)
                    bad.splice(dbw)
					fs.writeFileSync('./src/bad.json', JSON.stringify(bad))
					reply('*Éxito en eliminar mala palabra!*')
					break
				//Fin de la estructura

				//Entrada de reglas						
				case 'reglas':
					if (!isGroup) return reply(mess.only.group)
					imgreglas = await getBuffer(`https://www.e-comex.com/wp-content/uploads/2017/02/Mano1-300x137.png`)
					client.sendMessage(from, imgreglas, image, { quoted: mek } )
					let lrg = `*Reglas del Grupo Favor Respetarlas Bien*\n*total* : *${regla.length}*\n\n`
					for (let y of regla) {
					lrg += `*->* *${y.replace(regla)}*\n\n`
					}
					await reply(lrg) 
					break

				case 'addregla':
					if (!isOwner) return reply(mess.only.ownerB)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply( `Para agregar ${prefix}regla (texto de regla) . ejemplo: ${prefix}addregla (texto de regla)`)
					const rg = body.slice(10)
                    regla.push(rg)
					fs.writeFileSync('./src/reglas.json', JSON.stringify(regla))
					reply('*Éxito en agregar regla*')
					break

				case 'delregla':
					if (!isOwner) return reply(mess.only.ownerB)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply( `Para borrar ${prefix}regla (texto de regla). ejemplo: ${prefix}delregla (texto de regla)`)
					let drg = body.slice(10)
                    regla.splice(drg)
					fs.writeFileSync('./src/reglas.json', JSON.stringify(regla))
					reply('*Éxito en eliminar regla*')
					break
				//Fin de la estructura
				
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Solo una foto, hermano')
					}
					break

					case 'stiker':
					case 'sticker':
							if (!isGroup) return reply(mess.only.group)
							if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
								const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
								const media = await client.downloadAndSaveMediaMessage(encmedia)
								ran = getRandom('.webp')
								reply(mess.wait)
								await ffmpeg(`./${media}`)
									.input(media)
									.on('start', function (cmd) {
										console.log(`Started : ${cmd}`)
									})
									.on('error', function (err) {
										console.log(`Error : ${err}`)
										fs.unlinkSync(media)
										reply(mess.error.stick)
									})
									.on('end', function () {
										console.log('Finish')
										buffer = fs.readFileSync(ran)
										client.sendMessage(from, buffer, sticker, {quoted: mek})
										fs.unlinkSync(media)
										fs.unlinkSync(ran)
									}
									)
									.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
									.toFormat('webp')
									.save(ran)
							} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
								const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
								const media = await client.downloadAndSaveMediaMessage(encmedia)
								ran = getRandom('.webp')
								reply(mess.wait)
								await ffmpeg(`./${media}`)
									.inputFormat(media.split('.')[1])
									.on('start', function (cmd) {
										console.log(`Started : ${cmd}`)
									})
									.on('error', function (err) {
										console.log(`Error : ${err}`)
										fs.unlinkSync(media)
										tipe = media.endsWith('.mp4') ? 'video' : 'gif'
										reply(`❌ Falló, en el momento de la conversión ${tipe} al stiker`)
									})
									.on('end', function () {
										console.log('Finish')
										buffer = fs.readFileSync(ran)
										client.sendMessage(from, buffer, sticker, {quoted: mek})
										fs.unlinkSync(media)
										fs.unlinkSync(ran)
									})
									.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
									.toFormat('webp')
									.save(ran)
									} else {
								reply(`*Envía fotos con subtítulos ${prefix}stiker/sticker o etiqueta de imagen que se ha enviado*`)
									}

				/*default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						return //console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}*/
				}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
