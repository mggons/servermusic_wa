var port = process.env.PORT || 5000;
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { color } = require('./lib/color')
const {_wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, success, author, close } = require('./lib/functions');
const { Miminnya, SesionName, ownerNumber} = require('./setting.json')
require('./SyA.js')
const moment = require("moment-timezone")
const welcome = require('./database/group.js')
//const grup = JSON.parse(fs.readFileSync('./group/welcome.json'))
nocache('./SyA.js', module => console.log(`${module} Cambios Realizados con exito`))
var sd = require('silly-datetime');
const { BADFLAGS } = require('dns');
const { REPL_MODE_SLOPPY } = require('repl');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const timeHours = moment.tz('America/Bogota').format('HH:mm:ss');
hours = timeHours;

var hoy = new Date();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
var fechaYHora = fecha + ' ' + hora;


const _welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))

const time2 = moment().tz('America/Bogota').format('HH:mm:ss')
          if(time2 < "23:59:00"){
          var ucapanWaktu = 'Buenas Noches'
}
          if(time2 < "19:00:00"){
          var ucapanWaktu = 'Buenas noches'
}
          if(time2 < "18:00:00"){
          var ucapanWaktu = 'Buenas noches'
}
          if(time2 < "15:00:00"){
          var ucapanWaktu = 'Buenas tardes'
}
          if(time2 < "11:00:00"){
          var ucapanWaktu = 'Buenos días'
}
          if(time2 < "05:00:00"){
          var ucapanWaktu = 'Buenas Noches'
}

const starts = async (client = new WAConnection()) => {
    client.logger.level = 'warn'
    client.version = [3, 3234, 9];
    client.browserDescription = [ 'Soporte y Aportes', 'Edge', '101.0' ]
	//console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Escanea el codigo QR rapido!!!  '))
	})

	fs.existsSync('./codec.json') && client.loadAuthInfo('./codec.json')
	client.on('connecting', () => {
		start('2', 'Desconectado')
	})
	client.on('open', () => {
		success('2','Servidor Conectado Con Exito')
        console.log(color('','aqua'), color(`||================================================||`, "cyan"))
        console.log(color(' ||> ','cyan'), color(`     El Sistema se encuentra Operativo     `, 'cyan'),color('<||','cyan'))
        console.log(color('','aqua'), color(`||================================================||`, "cyan"))
        client.sendMessage(`573144182071@s.whatsapp.net`, `Hola, el bot inicio con exito a las ${sd.format(new Date(), 'DD-MM-YYYY HH:mm:ss')}\n\nActivado por: ${Miminnya}\n*Numero* : ${ownerNumber}\n*Estado* : Online\n\nSi recibio este mensaje puede ignorarlo`, MessageType.extendedText)
	})
	await client.connect({timeoutMs: 60*1000})
        fs.writeFileSync('./codec.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

    client.on('chat-update', async (message) => {
    require('./SyA.js')(client, message, _welkom)
    })



    
//================================================================================/
//==============================    Bienvenida    ================================/
//================================================================================/
       client.on('group-participants-update', async (anu) => {
        //if (!welkom.includes(anu.jid)) return
        const isWelkom = _welkom.includes(anu.jid)
        try {
            const mdata = await client.groupMetadata(anu.jid)
            console.log(anu)
            if (anu.action == 'add') {
                num = anu.participants[0]
                try {
                ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
                } catch {
                ppimg = 'https://i.ibb.co/ZzppcWM/bienvenida.jpg'
                }
                teks =  `╭────────••◈••───────╮\n`
                teks += `║➣ *${mdata.subject}*\n`
                teks += `║➣ *Bienvenid@ a:*\n`
                teks += `║➣ *@${num.split('@')[0]}*\n`
                teks += `║➣ *Recuerda registrarse*\n`
                teks += `║➣ *Recuerda leer las reglas*\n`			
                teks += `╰────────••◈••───────╯\n`
                teks += `*Hola* @${num.split('@')[0]}\n*Debido a las nuevas politicas,*\n*te debemos aclarar que debes leerlas con atención.*`
                teks += `\n\n*En caso de infringir nuestras politicas,no nos hacemos reponsables de tu expulsion*`
                teks += `\n\n*Ten en cuenta que este es un grupo colaborativo y educativo*`
                teks += `\n\n*Que pases bien y que tengas un buen comienzo en nuestra comunidad que es tu familia*`
                let buff = await getBuffer(ppimg)
                client.sendMessage(mdata.id,  buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
                listMsg = {
                    buttonText: 'Opciones del BOT',
                    footerText: `\nSoporte y Aportes Oficial BOT v11.0`,
                    description: `*Antes de comenzar debes leer las politicas del grupo* ${mdata.subject}`,
                    sections: [
                    {
                    rows: [
                    {
                      "title": "Politicas de Grupo",
                      "rowId": `${prefix}politicas`
                      },
                    {
                      "title": "Menu",
                      "rowId": `${prefix}menu`
                    },
                    {
                      "title": "Creador",
                      "rowId": `${prefix}owner`
                    },
                    {
                      "title": "Estado del Bot",
                      "rowId": `${prefix}status`
                    }
                    ]
                    }],
                    listType: 1
                    }
                await sleep(2500);
                client.sendMessage(mdata.id, listMsg, MessageType.listMessage)
            } else if (anu.action == 'remove') {
                num = anu.participants[0]
                try {
                ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
                } catch {
                ppimg = 'https://cdn.memegenerator.es/imagenes/memes/full/31/24/31247292.jpg'
                }
                out =  `╭────────••◈••───────╮\n║➣ *${mdata.subject}*\n║➣ *Despidamos a:*\n║➣ *@${num.split('@')[0]}*\n║➣ *Por no aportacion*\n║➣ *y participacion🔪*\n╰────────••◈••───────╯\n`
                footer = `*Soporte y Aportes Oficial V11*`
                let buff = await getBuffer(ppimg)
                client.sendMessage(mdata.id, buff, MessageType.image, {caption: out, contextInfo: {"mentionedJid": [num]}, footerText: footer})
            }
            if (anu.action == 'promote') {
                num = anu.participants[0]
                ppimg = 'https://pngimage.net/wp-content/uploads/2018/05/administrador-icono-png-5.png'
                teks = `*Ahora tienes el cargo como: _Administrador_*\n\n*Felicidades @${num.split('@')[0]}*✔👨‍🔧\n`      
                let buff = await getBuffer(ppimg)
                client.sendMessage(mdata.id,  buff, MessageType.image, {caption: teks, footerText: `*Soporte y Aportes Oficial V11*`, contextInfo: {"mentionedJid": [num]}})
            } else if (anu.action == 'demote') {
                num = anu.participants[0]
                ppimg = 'https://pngimage.net/wp-content/uploads/2018/05/administrador-icono-png-5.png'
                teks = `*Ya no tienes el cargo como: _Administrador_ @${num.split('@')[0]}*\n\n*Para la Proxima*🚫👨‍🔧\n` 
                footer = `*Soporte y Aportes Oficial V11*`
                let buff = await getBuffer(ppimg)
                client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}, footerText: footer})
            }

        } catch (e) {
            console.log('Error : %s', color(e, 'red'))
        }
    })}



//================================================================================/
//==============================  Administrador   ================================/
//================================================================================/

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Modulo', `'${module}'`, 'ahora está visualizando los cambios')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
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

starts()
