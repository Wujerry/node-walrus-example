import fs from 'fs'
import https from 'https'
import path from 'path'

export function downloadBin() {
  const url =
    'https://storage.googleapis.com/mysten-walrus-binaries/walrus-testnet-latest-ubuntu-x86_64'
  const dest = '/tmp/node-walrus/bin'
  if (!fs.existsSync(path.join(dest, 'walrusjs'))) {
    console.log('Binary already exists')
    return
  }
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const fileName = 'walrusjs'

  const filePath = path.join(dest, fileName)

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
