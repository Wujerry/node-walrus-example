import { WalrusClient } from 'node-walrus-vercel'
import path from 'path'

const clientConfig = path.resolve(process.cwd(), 'config', 'client_config.yaml')
const walletConfig = path.resolve(process.cwd(), 'config', 'sui_config.yaml')

const client = new WalrusClient(clientConfig, walletConfig)
console.log('client inited')
console.log(client.runNpxVersion(), 'client.runNpxVersion()')

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
