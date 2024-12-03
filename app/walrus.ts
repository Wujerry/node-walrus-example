import { WalrusClient } from 'node-walrus-vercel'
import path from 'path'
import fs from 'fs'

const clientConfig = path.resolve(process.cwd(), 'config', 'client_config.yaml')
const walletConfig = path.resolve(process.cwd(), 'config', 'sui_config.yaml')
console.log(clientConfig)
console.log(walletConfig)

// read file sync
const clientConfigContent = fs.readFileSync(clientConfig, 'utf8')
console.log(clientConfigContent)
const walletConfigContent = fs.readFileSync(walletConfig, 'utf8')
console.log(walletConfigContent)
console.log(process.cwd(), 'process.cwd()')
console.log(__dirname, '__dirname')
const client = new WalrusClient(clientConfig, walletConfig)

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
  return client.runNpxVersion()
}
