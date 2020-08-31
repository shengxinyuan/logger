const path = require('path');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const expressApp = express();
const expressWs = require('express-ws');
const clients = [];

// 监听端口，启动程序
const port = 3003;
// ip地址
const ip = getIPAdress();

expressWs(expressApp);

expressApp.use(cookieParser());
expressApp.use(bodyParser.urlencoded({extended: false}));

function getIPAdress(){
  const interfaces = os.networkInterfaces();
  for(let devName in interfaces){
    const iFace = interfaces[devName];
    for(let i=0;i<iFace.length;i++){
      const alias = iFace[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        console.log('address',alias.address);
        return alias.address;
      }
    }
  }
}

expressApp.ws('/logger', function (ws, req) {
  clients.push(ws)
  ws.send('设备连接成功了')

  ws.on('message', function (msg) {
    if (/^[HxC]/.test(msg)) {
      return
    }
    clients.forEach(ws => {
      ws.send(msg)
    })
  })

  ws.on('close', function (msg) {
    for (let index = 0; index < clients.length; index++) {
      if (clients[index] == this) {
        clients.splice(index, 1)
      }
    }
  })

  ws.on('error', function (msg) {
    ws.send('设备连接失败了', msg)
  })

});

expressApp.listen(port, function () {
  console.log(`logger listening on port ${port}`)
});
