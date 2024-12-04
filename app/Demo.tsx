'use client'

import { useEffect, useState } from 'react'

import hljs from 'highlight.js'
import typescript from 'highlight.js/lib/languages/typescript'
import { VersionDemo } from './components/VersionDemo'
import { InfoDemo } from './components/InfoDemo'
import { StoreBlobDemo } from './components/StoreBlobDemo'
import { ListBlobDemo } from './components/ListBlobDemo'
import { ReadDemo } from './components/ReadDemo'
import { BlobStatusDemo } from './components/BlobStatusDemo'
import { ConverIdDemo } from './components/ConverIdDemo'
import { DeleteDemo } from './components/DeleteDemo'

export default function Demo() {
  const [output, setOutput] = useState({ __html: '' })

  useEffect(() => {
    hljs.registerLanguage('typescript', typescript)
    hljs.highlightAll()
  }, [])

  return (
    <div style={{ padding: 16, width: 1280, margin: '0 auto' }}>
      <h1>Walrus demo on Vercel</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 450, overflow: 'auto' }}>
          <div style={{ padding: 8 }}>
            <h3>Init node-walrus client</h3>
            <pre>
              <code className="ts">{initClientCode}</code>
            </pre>
          </div>
          <InfoDemo setOutput={setOutput} />
          <VersionDemo setOutput={setOutput} />
          <ListBlobDemo setOutput={setOutput} />
          <StoreBlobDemo setOutput={setOutput} />
          <ReadDemo setOutput={setOutput} />
          <DeleteDemo setOutput={setOutput} />
          <BlobStatusDemo setOutput={setOutput} />
          <ConverIdDemo setOutput={setOutput} />
        </div>

        <div
          style={{
            flex: 1,
            border: '1px solid #e6e6e6',
            margin: 8,
            padding: 8,
            position: 'sticky',
            top: 0,
            height: '90vh',
            overflow: 'auto',
          }}
        >
          <pre
            className="json-container"
            dangerouslySetInnerHTML={output}
          ></pre>
        </div>
      </div>
    </div>
  )
}

const initClientCode = `import { WalrusClient } from 'node-walrus'

// init node-walrus client
const walrusClient = new WalrusClient(clientConfigTmpPath, walletConfigTmpPath)
`
