const fs = require('fs')
_cid = JSON.parse(fs.readFileSync('./database/cid/cid.json'))
const cidcode = (prefix, pushname) => {
    return `
Confirmation ID (CID):
${_cid.confirmation_id_no_dash}

REM CMD Activation
REM Windows
cscript.exe "%windir%\\system32\\slmgr.vbs" /atp ${_cid.confirmation_id_no_dash}
cscript.exe "%windir%\\system32\\slmgr.vbs" /ato

REM Office 2016 - 2019
if exist "%ProgramFiles%\\Microsoft Office\\Office16\\ospp.vbs" cd /d "%ProgramFiles%\\Microsoft Office\\Office16"
if exist "%ProgramFiles(x86)%\\Microsoft Office\\Office16\\ospp.vbs" cd /d "%ProgramFiles(x86)%\\Microsoft Office\\Office16"
cscript.exe OSPP.vbs /actcid:${_cid.confirmation_id_no_dash}
cscript.exe OSPP.vbs /act

REM Office 2013
if exist "%ProgramFiles%\\Microsoft Office\\Office15\\ospp.vbs" cd /d "%ProgramFiles%\\Microsoft Office\\Office15"
if exist "%ProgramFiles(x86)%\\Microsoft Office\\Office15\\ospp.vbs" cd /d "%ProgramFiles(x86)%\\Microsoft Office\\Office15"
cscript.exe OSPP.vbs /actcid:${_cid.confirmation_id_no_dash}
cscript.exe OSPP.vbs /act

REM Office 2010
if exist "%ProgramFiles%\\Microsoft Office\\Office14\\ospp.vbs" cd /d "%ProgramFiles%\\Microsoft Office\\Office14"
if exist "%ProgramFiles(x86)%\\Microsoft Office\\Office14\\ospp.vbs" cd /d "%ProgramFiles(x86)%\\Microsoft Office\\Office14"
cscript.exe OSPP.vbs /actcid:${_cid.confirmation_id_no_dash}
cscript.exe OSPP.vbs /act
	`
}
exports.cidcode = cidcode
