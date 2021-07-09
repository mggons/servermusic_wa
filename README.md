<p align="center">
<a href="#"><img title="MUSIC LOGO" src="https://img.utdstc.com/icon/9f1/c7b/9f1c7ba989ad4a11039b0a5a82bc4a8db39dda35d2c8fe26a46d1a0d277df877:200" width="128" height="128"></a>
</p>

<p align="center">
Este es un Bot esta diseñado para la descarga de Musica y Videos a travez de YouTube usando Whatsapp
<p align="center">
Version 0.1

## Clona el Proyecto

```bash
> git clone https://github.com/mggons/servermusic_wa
```

## Instala las dependencias:
Antes de ejecutar el siguiente comando, asegúrese de estar en el directorio del proyecto que
acabas de clonar !!

```bash
> cd termux-wabot
> bash install.sh
```

### Para Usar 
```bash
> npm start
```

### Debes Configurar
```json
{
	"prefix": ".",
	"ownerNumber": "62858xxxxx",
	"apiKey": "Your ApiKey here"
}
```


## Features 
|Activo|       Grupo y Administradores          |
|:-:|:-----------------------------------------:|
|✅| info -> Admin creador                               |
|✅| setprefix -> Cambia el codigo inicial del grupo     |
|✅| welcomusic -> Bienvenida para grupos de musica      |  (0 deshabilitado, 1 habilitado)
|✅| admins -> En lista de admins del grupo              |
|✅| linkgrupo -> link del grupo                         |
|✅| promover -> Promueve a administrador (solo admins)  |
|✅| desmontar -> Degarda de admin a user (solo admins)  |
|✅| llamada -> En lista a todos con etiqueta            |
|✅| gb -> Mensaje Global medio de difusion (solo admins)|
|✅| add -> Añade numeros al grupo (solo admins)         |
|✅| kick -> Elimina a usuario del grupo (solo admins)   |
|✅| abrirchat -> Permite escribir todos en el grupo (solo admins)  |
|✅| cerrarchat -> Permite cerrar el grupo,solo escriben admins (solo admins)  |

|Activo|    Comandos de Musica y Videos a Descargar      |
|:-:|:-----------------------------------------:|
|✅| ytbuscar -> Busca en youtube                        |
|✅| mp3 -> Sacar pista de audio de Youtube              |
|✅| mp4 -> Sacar video de Youtube                       |


Proximamente mas Comandos

	
## Error de Bailkeys

Si se presenta este error deben corregirlo meniante este codigo 

```bash
> cd node_modules
> cd @adiwajshing
> cd bailkeys
> cd lib	
> cd WAConnection
- nano 0.Base.js
	Se cambia la linea que dice: .
	/** The version of WhatsApp Web we're telling the servers we are */
        this.version = [2, 2119, 9]; //Debe cambiar esto cuando no se ejecute el bot a 2, 2119, 6
	
```
