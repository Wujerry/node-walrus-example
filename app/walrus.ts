import { WalrusClient } from 'node-walrus'
import path from 'path'

const clientConfig = path.resolve(process.cwd(), 'config', 'client_config.yaml')
const walletConfig = path.resolve(process.cwd(), 'config', 'sui_config.yaml')
console.log(clientConfig)
console.log(walletConfig)
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
