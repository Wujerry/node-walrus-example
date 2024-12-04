import { prettyPrintJson } from 'pretty-print-json'
import { useState } from 'react'

export function BlobStatusDemo({
  setOutput,
}: {
  setOutput: (output: { __html: string }) => void
}) {
  const [blobId, setBlobId] = useState<string>('')
  const infoCode = `// walrus blob-status --blob-id <BLOB_ID>
const res = walrusClient.blobStatus({
    blobId
  })
`
  const handleRunCode = async () => {
    const res = await fetch('/api/walrus?cmd=blobstatus&blobId=' + blobId).then(
      (res) => res.json()
    )
    setOutput({ __html: prettyPrintJson.toHtml(res) })
  }
  return (
    <div style={{ padding: 8 }}>
      <h3>walrus blob-status</h3>
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
