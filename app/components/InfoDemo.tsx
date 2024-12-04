import { prettyPrintJson } from 'pretty-print-json'

export function InfoDemo({
  setOutput,
}: {
  setOutput: (output: { __html: string }) => void
}) {
  const infoCode = `// walrus info 
const res = walrusClient.getInfo()
`
  const handleRunCode = async () => {
    const res = await fetch('/api/walrus?cmd=info').then((res) => res.json())
    setOutput({ __html: prettyPrintJson.toHtml(res) })
  }
  return (
    <div style={{ padding: 8 }}>
      <h3>walrus info</h3>
      <button onClick={handleRunCode}> Run code</button>
      <pre>
        <code className="ts">{infoCode}</code>
      </pre>
    </div>
  )
}
