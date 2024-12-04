import { prettyPrintJson } from 'pretty-print-json'
import { useState } from 'react'
const MAX_FILE_SIZE: number = 10 * 1024 * 1024
export function StoreBlobDemo({
  setOutput,
}: {
  setOutput: (output: { __html: string }) => void
}) {
  const listBlobCode = `// walrus store /path/to/file --epochs 1 --deletable
const filePath = 'path/to/file'
const res = walrusClient.storeBlob(filePath, {
	epochs: 1,
	deletable: true
})
`

  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.size <= MAX_FILE_SIZE) {
      setFile(selectedFile)
    } else {
      alert('file size exceeds the limit, < 10MB')
      setFile(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/walrus/upload', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        const data = await response.json()
        console.log('upload success', data)
        setOutput({ __html: prettyPrintJson.toHtml(data) })
      } else {
        console.error('upload failed', response.statusText)
      }
    } catch (error) {
      console.error('upload error', error)
    }
  }
  return (
    <div style={{ padding: 8 }}>
      <h3>walrus store</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>upload</button>
      <pre>
        <code className="ts">{listBlobCode}</code>
      </pre>
    </div>
  )
}
