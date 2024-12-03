import { WalrusClient } from 'node-walrus'
import path from 'path'
import { downloadBin } from './util'

// donwload walrus binary to /tmp/node-walrus/bin when deloy on vercel
await downloadBin()

const clientConfig = path.resolve(process.cwd(), 'config', 'client_config.yaml')
const walletConfig = path.resolve(process.cwd(), 'config', 'sui_config.yaml')

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
