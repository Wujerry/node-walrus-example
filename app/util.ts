import fs from 'fs'
import https from 'https'
import path from 'path'

export function downloadBin() {
  const url =
    'https://storage.googleapis.com/mysten-walrus-binaries/walrus-testnet-latest-ubuntu-x86_64'
  const dest = '/tmp/node-walrus/bin'
  const binPath = path.join(dest, 'walrusjs')
  if (fs.existsSync(binPath)) {
    console.log(`Binary already exists: ${binPath}`)
    return
  }
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const fileName = 'walrusjs'

  const filePath = path.join(dest, fileName)

  console.log('Downloading binary...')
  return downloadBinary(url, filePath)
    .then(() => {
      setExecutablePermission(filePath)
      console.log(`Binary saved to ${filePath}`)
    })
    .catch((err) => {
      console.error('Error downloading binary:', err)
      process.exit(1)
    })
}

function setExecutablePermission(filePath: string) {
  fs.chmodSync(filePath, 0o755) // 设置执行权限
}

function downloadBinary(url: string, dest: string) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          return reject(`Failed to get '${url}' (${response.statusCode})`)
        }

        response.pipe(file)

        file.on('finish', () => {
          file.close()
          console.log(`Downloaded binary to ${dest}`)
          resolve('done')
        })

        file.on('error', (err) => {
          fs.unlink(dest, () => reject(err))
        })
      })
      .on('error', (err) => {
        fs.unlink(dest, () => reject(err))
      })
  })
}

export async function initConfigFile() {
  const clientConfig = path.resolve(
    process.cwd(),
    'config',
    'client_config.yaml'
  )
  const walletConfig = path.resolve(process.cwd(), 'config', 'sui_config.yaml')
  const keyStore = path.resolve(process.cwd(), 'config', 'sui.keystore')

  // check if config file exists in under /tmp
  if (fs.existsSync(clientConfig)) {
    console.log('config file already exists')
    return
  }
  // copy config file to /tmp
  fs.copyFileSync(clientConfig, '/tmp/client_config.yaml')
  fs.copyFileSync(walletConfig, '/tmp/sui_config.yaml')
  fs.copyFileSync(keyStore, '/tmp/sui.keystore')

  console.log('config file copied')
}

export const clientConfigTmpPath = '/tmp/client_config.yaml'
export const walletConfigTmpPath = '/tmp/sui_config.yaml'
