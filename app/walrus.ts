import { WalrusClient } from 'node-walrus'
import {
  clientConfigTmpPath,
  downloadBin,
  initConfigFile,
  walletConfigTmpPath,
} from './util'

// donwload walrus binary to /tmp/node-walrus/bin when deloy on vercel
await downloadBin()

await initConfigFile()

const client = new WalrusClient(clientConfigTmpPath, walletConfigTmpPath)
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
