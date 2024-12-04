/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

export function ReadDemo({}: {
  setOutput: (output: { __html: string }) => void
}) {
  const [blobId, setBlobId] = useState<string>('')
  const [src, setSrc] = useState<string>('')
  const infoCode = `// walrus read <BLOB_ID>
const res = walrusClient.readBlobAsStream(blobId)
const res = walrusClient.readBlobToPath(blobId, path)
`
  const handleRunCode = async () => {
    if (!blobId) return
    const response = await fetch(`/api/walrus?cmd=read&&blobId=${blobId}`)
    if (response.ok) {
      const blob = await response.blob()
      const downloadUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = blobId
      link.click()
      URL.revokeObjectURL(downloadUrl)
    }
  }
  return (
    <div style={{ padding: 8 }}>
      <h3>walrus read</h3>
      <input
        type="text"
        placeholder="BlobId"
        onChange={(e) => setBlobId(e.target.value)}
      />
      <button onClick={() => setSrc(`/api/walrus?cmd=read&&blobId=${blobId}`)}>
        Preview Image
      </button>
      <button onClick={handleRunCode}> Download </button>
      <img src={src === '' ? undefined : src} alt="" />
      <pre>
        <code className="ts">{infoCode}</code>
      </pre>
    </div>
  )
}
