import { getInfo, getListBlob, getVersion } from '@/app/walrus'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  console.log(process.cwd(), 'process.cwd()')
  console.log(__dirname, '__dirname')
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

  if (cmd === 'npxversion') {
    const res = await getVersion()
    return Response.json(res)
  }
}
