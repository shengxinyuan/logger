const path = require('path');
const e = require('express');
const pkginfo = require('pkginfo')(module, 'version');

let versionList = pkginfo.version.split('.')
let version = `${versionList[2]}.${versionList[0]}.${versionList[1]}`

/**
 * `electron-packager` options
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-packager.html
 */
module.exports = {
  arch: 'x64',
  asar: true,
  name: `logger_${version}`,
  dir: path.join(__dirname, '../'),
  icon: path.join(__dirname, '../build/icons/icon'),
  ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
  out: path.join(__dirname, '../build'),
  overwrite: true,
  platform: process.env.BUILD_TARGET || 'all'
}
