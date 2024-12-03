import { WalrusClient } from 'node-walrus-vercel'
import path from 'path'
import fs from 'fs'

const clientConfig = path.resolve(process.cwd(), 'config', 'client_config.yaml')
const walletConfig = path.resolve(process.cwd(), 'config', 'sui_config.yaml')

const client = new WalrusClient(clientConfig, walletConfig)
console.log('client inited')
client.runNpxVersion().then((res) => {
  console.log('npx version', res)
})

export function getInfo() {
  return client.getInfo()
}

export function getListBlob() {
  return client.listBlobs()
}

export function getVersion() {
  return client.getVersion()
}

export function getNpxVersion() {
  console.log('getNpxVersion')
  console.log(
    fs.existsSync(process.cwd() + '/node_modules/node-walrus-vercel'),
    'node-walrus-vercel'
  )
  console.log(
    fs.existsSync(process.cwd() + '/node_modules/node-walrus-vercel/bin'),
    'bin'
  )
  console.log(
    fs.existsSync(
      process.cwd() + '/node_modules/node-walrus-vercel/bin/walrusjs'
    ),
    'bin'
  )
  return client.runNpxVersion()
}
