import { prettyPrintJson } from 'pretty-print-json'
import { useState } from 'react'

export function ConverIdDemo({
  setOutput,
}: {
  setOutput: (output: { __html: string }) => void
}) {
  const [blobId, setBlobId] = useState<string>('')
  const infoCode = `// walrus convert-blob-id <BLOB_ID_DECIMAL>
const res = walrusClient.convertBlobId(decimalBlobId)
`
  const handleRunCode = async () => {
    const res = await fetch(
      '/api/walrus?cmd=convert&decimalBlobId=' + blobId
    ).then((res) => res.json())
    setOutput({ __html: prettyPrintJson.toHtml(res) })
  }
  return (
    <div style={{ padding: 8 }}>
      <h3>walrus convert-blob-id</h3>
      <input
        type="text"
        placeholder="decimalBlobId"
        onChange={(e) => setBlobId(e.target.value)}
      />
      <button onClick={handleRunCode}> Run code</button>
      <pre>
        <code className="ts">{infoCode}</code>
      </pre>
    </div>
  )
}
