import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { storeBlob } from '@/app/walrus'

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()
  const body = Object.fromEntries(formData)
  const file = (body.file as Blob) || null
  let name = ''
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())

    name = (body.file as File).name
    fs.writeFileSync(path.resolve('/tmp', name), buffer)
  } else {
    return NextResponse.json({
      success: false,
    })
  }
  const res = await storeBlob(path.resolve('/tmp', name), {
    epochs: 2,
    deletable: true,
  })

  return NextResponse.json(res)
}
