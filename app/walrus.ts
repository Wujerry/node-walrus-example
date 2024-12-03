import { WalrusClient } from 'node-walrus'
import path from 'path'
import { downloadBin } from './util'
import fs from 'fs'

// donwload walrus binary to /tmp/node-walrus/bin when deloy on vercel
await downloadBin()

const clientConfig = path.resolve(process.cwd(), 'config', 'client_config.yaml')
const walletConfig = path.resolve(process.cwd(), 'config', 'sui_config.yaml')
const keyStore = path.resolve(process.cwd(), 'config', 'sui.keystore')
console.log('clientConfig', keyStore)
// read file form keyStore
const keyStoreContent = await fs.promises.readFile(keyStore, 'utf-8')
console.log('keyStoreContent', keyStoreContent)

const client = new WalrusClient(clientConfig, walletConfig)
console.log('client inited')

export function getInfo() {
  return client.getInfo()
}

export function getListBlob() {
  return client.listBlobs()
}

export function getVersion() {
  return client.getVersion()
}
