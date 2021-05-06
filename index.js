const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const wmusica = JSON.parse(fs.readFileSync('./src/wmusica.json')) //añadida entrada para grupo de musica
const result = JSON.parse(fs.readFileSync('./src/result.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
const { tmpdir } = require("os");
const path = require("path");
const Axios = require("axios");
const Crypto = require("crypto");
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
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', 'Conectando...')
	})
	client.on('open', () => {
		success('2', 'Conectado.')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
	
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
				teks = `Hola @*${num.split('@')[0]}*\nTe damos la bienvenida a *${mdata.subject}* \nespero que el grupo sea de tu agrado.☺, \nPara descargar audio usa *#mp3 (espacio) y luego 'Link de video'* \nPara descargar Video usa *#mp4 (espacio) y luego 'Link de video'*
				\nRecuerda los videos deben ser de Youtube preferible de tipo lyrics,\nPara buscar una cancion o artista usa *#ytsearch`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'http://pa1.narvii.com/6412/fe4648f79f54789195ace50a4650a7cfc0c7f8b0_00.gif'
				}
				teks = `Te hemos expulsado por no participacion,\n lo sentimos muchos y que tengas buen dia. @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

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
			const apiKey = setting.apiKey
			const apiKey2 = setting.apiKey2// contact me on whatsapp wa.me/6285892766102
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Bogota').format('DD/MM HH:mm:ss') //cambio de Zona horaria
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '⌛ En proceso  ⌛',
				success: '✔️ Completado ✔️',
				error: {
					stick: '❌ Falló, se produjo un error al convertir la imagen en una pegatina ❌',
					Iv: '❌ Enlace inválido ❌'
				},
				only: {
					group: '❌ ¡Este comando solo se puede usar en grupos! ❌',
					ownerG: '❌ ¡Este comando solo puede ser utilizado por el grupo propietario! ❌',
					ownerB: '❌ ¡Este comando solo puede ser utilizado por el bot propietario! ❌',
					admin: '❌ ¡Este comando solo puede ser utilizado por administradores de grupo! ❌',
					Badmin: '❌ ¡Este comando solo se puede usar cuando el bot se convierte en administrador! ❌'
				}
			}
			const speed = require('performance-now');
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
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isWelkomusic = isGroup ? wmusica.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isresult = isGroup ? result.includes(from) :false
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
			
			
			switch(command) {
				
				case 'help':
				case 'menu':
					client.sendMessage(from, help(prefix), text)
					break
										
        			case 'info':
               				client.sendMessage(from, {displayname: "JDMTECH", vcard: vcard}, MessageType.contact, { quoted: mek})
               				client.sendMessage(from, '_*Este es mi propietario. No olvides cualquier inquietud con el admin ...*_',MessageType.text, { quoted: mek} )
					tod = await getBuffer(`https://i.ibb.co/Vm5FHxc/IMG-20210312-WA1759.jpg`)
 					client.sendMessage(from, tod, image, { quoted: mek, caption: '_*Tomate tu tiempo y donanos a nuestro paypal, te lo agradeceremos con gusto ->  https://www.paypal.me/malagons !!*_'})
        				break
					
				case 'ping':
             				const timestamp = speed();
             				const latensi = speed() - timestamp
             				client.updatePresence(from, Presence.composing) 
					uptime = process.uptime()
             				client.sendMessage(from, `Speed: *${latensi.toFixed(4)} _Segundos_*\nDispositivo: *Windows Server 2019*\nRAM: *12GB*\nRed: *LAN-1GB*\nStatus: *Online*\nTipo de BOT: *Termux Emulator*\n\n*El bot esta activo desde*\n*${kyun(uptime)}*`, text, { quoted: mek})
           				break

				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					setting.prefix = prefix
					fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
					reply(`El prefijo se ha cambiado correctamente a : ${prefix}`)
					break
					
				 /*case 'mp3':  //modificaciones de JDMTECH
                    			if (args.length < 1) return reply('Y el url de youtube?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.wrogf())
					anu = await fetchJson(`https://videfikri.com/api/ytmp3/?url=${args[0]}`, {method: 'get'})  //modificaciones de JDMTECH
					if (anu.error) return reply(anu.error)
					teks = `*Titulo* : ${anu.title}\n*Peso* : ${anu.size}\n*formato* : ${anu.format}\n*Descarga* : ${anu.url_audio}\n*result* : ${anu.result}`
					thumb = await getBuffer(anu.thumbnail)
					client.sendMessage(from, thumbnail, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
					
				  case 'mp4':  //modificaciones de JDMTECH
					if (args.length < 1) return reply('Y el url de youtube?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.stikga())
					anu = await fetchJson(`https://videfikri.com/api/ytmp4/?url=${args[0]}`, {method: 'get'}) //modificaciones de JDMTECH
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Size* : ${anu.filesize}\n*result* : ${anu.url_video}\n** : ${anu.thumbnail}`
					thumb = await getBuffer(anu.thumbnail)
					client.sendMessage(from, thumbnail, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.url_video)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break*/ 
					
				case 'mp3': //Añadido by JDMTECH
					if (args.length < 1) return reply('Y el url de youtube?')
					anu = await fetchJson(`https://api.zeks.xyz/api/ytmp3/2?url=${args[0]}&apikey=apivinz`, {method: 'get'})
					thumbnail = await getBuffer(anu.result.thumb)
					teks = `*Titulo* : ${anu.result.title}\n*Tamaño* : ${anu.result.size}\n*Calidad* : ${anu.result.quality}\n*Espere un momento para ser enviado*\n*el enlace de audio a través del*\n*enlace de descarga*: ${anu.result.link}`
					client.sendMessage(from, thumbnail, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result.link)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: mek})
					break
				case 'mp4': //Añadido by JDMTECH 
					if (args.length < 1) return reply('Y el url de youtube?')
					anu = await fetchJson(`https://api.zeks.xyz/api/ytmp4?url=${args[0]}&apikey=apivinz`, {method: 'get'})
					thumbnail = await getBuffer(anu.result.thumbnail)
					teks = `*Titulo* : ${anu.result.title}\n*Tamaño* : ${anu.result.size}\n*Calidad* : ${anu.result.quality}\n*Espere un momento para ser enviado*\n*el enlace de audio a través del*\n*enlace de descarga*: ${anu.result.url_video}`
					client.sendMessage(from, thumbnail, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result.url_video)
 					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek, caption: 'Listo para disfrutar :)'})
					break
	
				case 'ytbuscar': //Añadido by JDMTECH 
					if (args.length < 1) return reply('¿Qué estás buscando?')
					reply(mess.wait)
					anu = await fetchJson(`https://api.zeks.xyz/api/yts?q=${body.slice(5)}&apikey=apivinz`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = '=================\n'
					for (let i of anu.result){
					teks += `*titulo* : *${i.video.title}*\n *link* : *https://youtu.be/${i.video.id}*
					\n*Publicado* : *${i.video.upload_date}*\n*Duracion* : *${i.video.duration}*
					\n=================\n`
					}
					reply(teks.trim())
					break
          
				case 'llamada':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*#* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
          
				case 'gb': //mensaje global, solo permitido a los administradores  //Añadido by JDMTECH 
					if (!isOwner) return reply('¿Quién es usted?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `*[ Iniciando Broadcast ]*\n\n${body.slice(4)}`})
						}
						reply('*Transmisión Completada*')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*[ Iniciando Broadcast ]*\n\n${body.slice(4)}`)
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
				case 'desmontar':
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
				case 'add':
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
          
				case 'kick':
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
          
				case 'welcomusic': //Añadido by JDMTECH para grupo de musicas 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Ya activo.. ')
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
				
				case 'cerrarchat': //Añadido by JDMTECH
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var nomor = mek.participant
					const close = {
					text: `Grupo cerrado por administrador @${nomor.split("@s.whatsapp.net")[0]}\nahora *Solo el administrador* puede enviar mensajes`,
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
			
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						return //console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
