/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  blobStatus,
  convertId,
  deleteBlob,
  getInfo,
  getListBlob,
  getVersion,
  readBlob,
} from '@/app/walrus'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cmd = searchParams.get('cmd')
  if (cmd === 'info') {
    const res = await getInfo()
    return Response.json(res)
  }
  if (cmd === 'listblob') {
    const res = await getListBlob()
    return Response.json(res)
  }

  if (cmd === 'version') {
    const res = await getVersion()
    return Response.json(res)
  }

  if (cmd === 'read') {
    const blobId = searchParams.get('blobId')
    const res = readBlob(blobId || '')
    if (res === null) {
      return new Response('Blob not found', { status: 404 })
    }
    const readableStream = new ReadableStream({
      start(controller) {
        res.on('data', (chunk) => controller.enqueue(chunk))
        res.on('end', () => controller.close())
        res.on('error', (err) => controller.error(err))
      },
    })
    return new NextResponse(readableStream)
  }

  if (cmd === 'blobstatus') {
    const blobId = searchParams.get('blobId')
    const res = await blobStatus(blobId || '')
    return Response.json(res)
  }

  if (cmd === 'convert') {
    const decimalBlobId = searchParams.get('decimalBlobId')
    const res = await convertId(decimalBlobId || '')
    return Response.json(res)
  }

  if (cmd === 'delete') {
    const blobId = searchParams.get('blobId')
    const res = await deleteBlob(blobId || '')
    return Response.json(res)
  }
}
