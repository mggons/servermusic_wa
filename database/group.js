const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/functions')
const { color, bgcolor } = require('../lib/color')

//let setting = JSON.parse(fs.readFileSync('../setting.json'))

module.exports = welcome = async (client, chat) => {
	    const welkom = JSON.parse(fs.readFileSync('../database/group/welcome.json'))
	    const isWelcome = welkom.includes(chat.jid)
	//    if (!isWelcome) return
		try {
			    mem = chat.participants[0]
			    console.log(chat)
                try {
               pic = await client.getProfilePicture(mem)
                } catch (e) {
                pic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            try {
                pp_grup = await client.getProfilePicture(chat.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
             }
            if (chat.action == 'add' && mem.includes(client.user.jid)) {
            client.sendMessage(chat.jid, '¡Hola! Gracias por invitarme, si quieres usar un bot, hazme administrador, sí, escribe .menu', 'conversación' )
            }
            if (chat.action == 'add' && mem.includes(client.user.jid)) {
            client.sendMessage(chat.jid,'¡Hola! Gracias por invitarme, si quieres usar un bot, hazme administrador, escribe .menu', 'conversation' )
            }
             if (chat.action == 'add' && !mem.includes(client.user.jid)) {
         //    if (!welkom.includes(chat.jid)) return
                mdata = await client.groupMetadata(chat.jid)
                memeg = mdata.participants.length
            	num = chat.participants[0]
               groupName = mdata.subject
                let v = client.contacts[num] || { notify: num.replace(/@.+/, '') }
                chat_user = v.vname || v.notify || num.split('@')[0]
              teks = `Bienvenida *@${mem.split('@')[0]}*\n*➸ Bienvenido al grupo *${groupName}*\n*➸ Primera introducción Hermana*\n*➸ Nombre:*\n*➸ Edad:* \n*➸ Aficiones:*\n*➸ Género:*\n*➸ Número :* ${mem.replace('@s.whatsapp.net', '')}\n*Buena suerte~~*`
              buff = await getBuffer(pic)
              client.sendMessage(mdata.id, { contentText: `${teks}`, footerText: `Welcome Message By *clientX4·Team*`, buttons: [{buttonId: `.selamatdatang`,buttonText:{displayText: 'WELCOME KAK'},type:1},{buttonId: `.rules`,buttonText:{displayText:'RULES BOT'},type:1},{buttonId:`.infogrouup`,buttonText:{displayText:'INFO GROUP'},type:1}],headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: buff, contextInfo: {"mentionedJid": [num]}}}, 'buttonsMessage')
		}
            if (chat.action == 'remove' && !mem.includes(client.user.jid)) {
        //    if (!welkom.includes(chat.jid)) return
                mdata = await client.groupMetadata(chat.jid)
            	num = chat.participants[0]
                let w = client.contacts[num] || { notify: num.replace(/@.+/, '') }
                chat_user = w.vname || w.notify || num.split('@')[0]
                memeg = mdata.participants.length
                out = `Selamat Tinggal Kak @${num.split('@')[0]} Semoga Jasamu Tidak Tenang!`
               buff = await getBuffer(pic)
               client.sendMessage(mdata.id, { contentText: `${out}`, footerText: `Left Message By *clientX4·Team*`, buttons: [{buttonId: `.bay`,buttonText:{displayText: 'BYE KAK👋'},type:1}],headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: buff, contextInfo: {"mentionedJid": [num]}}}, 'buttonsMessage')
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
