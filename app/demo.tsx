'use client'

import { prettyPrintJson } from 'pretty-print-json'

import { useState } from 'react'

export default function Demo() {
  const [output, setOutput] = useState({ __html: '' })
  const handleInfo = async () => {
    const res = await fetch('/api/walrus?cmd=info').then((res) => res.json())
    setOutput({ __html: prettyPrintJson.toHtml(res) })
  }

  const handleListBolb = async () => {
    const res = await fetch('/api/walrus?cmd=listblob').then((res) =>
      res.json()
    )
    setOutput({ __html: prettyPrintJson.toHtml(res) })
  }

  const handleVersion = async () => {
    const res = await fetch('/api/walrus?cmd=version').then((res) => res.json())
    setOutput({ __html: prettyPrintJson.toHtml(res) })
  }

  const handleNpxVersion = async () => {
    const res = await fetch('/api/walrus?cmd=npxversion').then((res) =>
      res.json()
    )
    setOutput({ __html: prettyPrintJson.toHtml(res) })
  }

  return (
    <div>
      <h1>walrus demo</h1>
      <div style={{ padding: 20 }}>
        <button onClick={handleInfo}>info</button>
        <button style={{ marginLeft: 20 }} onClick={handleListBolb}>
          list blob
        </button>
        <button style={{ marginLeft: 20 }} onClick={handleVersion}>
          version
        </button>

        <button style={{ marginLeft: 20 }} onClick={handleNpxVersion}>
          npx version
        </button>
      </div>
      <pre className="json-container" dangerouslySetInnerHTML={output}></pre>
    </div>
  )
}
