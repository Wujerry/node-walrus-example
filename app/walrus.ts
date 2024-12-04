import { WalrusClient } from 'node-walrus'
import {
  clientConfigTmpPath,
  downloadBin,
  initConfigFile,
  walletConfigTmpPath,
} from './util'
import { StoreConfig } from 'node-walrus/dist/types'

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

export function storeBlob(filePath: string, config?: StoreConfig) {
  return client.storeBlob(filePath, config)
}

export function readBlob(blobId: string) {
  return client.readBlobAsStream(blobId)
}

export function blobStatus(blobId: string) {
  return client.blobStatus({
    blobId,
  })
}

export function convertId(decimalBlobId: string) {
  return client.convertBlobId(decimalBlobId)
}

export function deleteBlob(blobId: string) {
  return client.deleteBlob({
    blobId,
  })
}
