import { prettyPrintJson } from 'pretty-print-json'

export function ListBlobDemo({
  setOutput,
}: {
  setOutput: (output: { __html: string }) => void
}) {
  const listBlobCode = `// walrus list-blobs
const res = walrusClient.listBlobs({ 
  includeExpired: true 
})
`
  const handleRunCode = async () => {
    const res = await fetch('/api/walrus?cmd=listblob').then((res) =>
      res.json()
    )
    setOutput({ __html: prettyPrintJson.toHtml(res) })
  }
  return (
    <div style={{ padding: 8 }}>
      <h3>walrus list-blobs</h3>
      <button onClick={handleRunCode}> Run code</button>
      <pre>
        <code className="ts">{listBlobCode}</code>
      </pre>
    </div>
  )
}
