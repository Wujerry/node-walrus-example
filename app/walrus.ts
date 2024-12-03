import { WalrusClient } from 'node-walrus'
import path from 'path'
import fs from 'fs'
import { downloadBin } from './util'

downloadBin()

const clientConfig = path.resolve(process.cwd(), 'config', 'client_config.yaml')
const walletConfig = path.resolve(process.cwd(), 'config', 'sui_config.yaml')

const client = new WalrusClient(clientConfig, walletConfig)
console.log('client inited')
logPath()

export function getInfo() {
  logPath()
  return client.getInfo()
}

export function getListBlob() {
  return client.listBlobs()
}

export function getVersion() {
  return client.getVersion()
}

export function logPath() {
  console.log(fs.existsSync('/tmp/node-walrus/bin/walrusjs'), '/tmp')
}
