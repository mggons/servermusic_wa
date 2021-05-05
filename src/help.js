const help = (prefix) => {
	return `
┏━━❉ *Acerca del BOT* ❉━━━┓
┣⊱ _*Nombre*_ : Soporte y Aportes BOT
┣⊱ *Grupo WP* : https://tinyurl.com/syagroup
┣⊱ *Web Pag*  : https://tinyurl.com/soporteyaportes
┣⊱ *Grupo TG* : https://t.me/soporteyapps
┣⊱ *Creador* : JDMTECH
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━

┏━━❉ *Comandos Disponibles* ❉━━━┓
┣⊱ *Comandos de Administrador y Usuario* 
┣⊱ ===============================
┣⊱ ${prefix}info -> Admin
┣⊱ ${prefix}setprefix -> Cambia el codigo inicial del grupo
┣⊱ ${prefix}welcomusic -> Bienvenida para grupos de musica
┣⊱ ${prefix}admins -> Enlista de admins del grupo 
┣⊱ ${prefix}linkgroup -> link del grupo
┣⊱ ${prefix}promover -> Promueve a administrador (solo admins)
┣⊱ ${prefix}desmontar -> Degarda de admin a user (solo admins)
┣⊱ ${prefix}llamada -> En lista a todos con etiqueta 
┣⊱ ${prefix}gb -> Mensaje Global medio de difusion (solo admins)
┣⊱ ${prefix}add -> Añade numeros al grupo (solo admins)
┣⊱ ${prefix}kick -> Elimina a usuario del grupo (solo admins)
┣⊱ ===============================
┣⊱ 	*Comandos de Musica*
┣⊱ ===============================
┣⊱ ${prefix}ytbuscar -> Busca en youtube 
┣⊱ ${prefix}mp3 -> Sacar pista de audio de Youtube
┣⊱ ${prefix}mp4 -> Sacar video de Youtube
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
}

exports.help = help
