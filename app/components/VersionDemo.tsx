import { prettyPrintJson } from 'pretty-print-json'
export function VersionDemo({
  setOutput,
}: {
  setOutput: (output: { __html: string }) => void
}) {
  const versionCode = `// walrus version
const res = walrusClient.getVersion()
`
  const handleRunCode = async () => {
    const res = await fetch('/api/walrus?cmd=version').then((res) => res.json())
    setOutput({ __html: prettyPrintJson.toHtml(res) })
  }
  return (
    <div style={{ padding: 8 }}>
      <h3>walrus version</h3>
      <button onClick={handleRunCode}> Run code</button>
      <pre>
        <code className="ts">{versionCode}</code>
      </pre>
    </div>
  )
}
