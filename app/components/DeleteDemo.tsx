import { prettyPrintJson } from 'pretty-print-json'
import { useState } from 'react'

export function DeleteDemo({
  setOutput,
}: {
  setOutput: (output: { __html: string }) => void
}) {
  const [blobId, setBlobId] = useState<string>('')
  const infoCode = `// walrus delete --blob-id <BLOB_ID>
// blobId || filePath || objectId
const res = walrusClient.deleteBlob({
    blobId
  })
`
  const handleRunCode = async () => {
    const res = await fetch('/api/walrus?cmd=delete&blobId=' + blobId).then(
      (res) => res.json()
    )
    setOutput({ __html: prettyPrintJson.toHtml(res) })
  }
  return (
    <div style={{ padding: 8 }}>
      <h3>walrus delete</h3>
      <input
        type="text"
        placeholder="BlobId"
        onChange={(e) => setBlobId(e.target.value)}
      />
      <button onClick={handleRunCode}> Run code</button>
      <pre>
        <code className="ts">{infoCode}</code>
      </pre>
    </div>
  )
}
